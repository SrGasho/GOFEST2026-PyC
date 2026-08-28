const { onRequest } = require('firebase-functions/v2/https');
const { onMessagePublished } = require('firebase-functions/v2/pubsub');
const logger = require('firebase-functions/logger');
const admin = require('firebase-admin');
const { PubSub } = require('@google-cloud/pubsub');

admin.initializeApp();

const db = admin.firestore();
const { FieldValue, Timestamp } = admin.firestore;

const TOPIC = 'shake-findings';
const STATUSES = ['SAFE', 'MISSING', 'UNCONFIRMED', 'INJURED', 'SEARCHING'];

const pubsub = new PubSub();

function validate(body) {
  const errors = [];

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { errors: ['body must be a JSON object'] };
  }

  for (const field of ['reporterId', 'emergencyId', 'personName']) {
    if (typeof body[field] !== 'string' || body[field].trim() === '') {
      errors.push(`${field} must be a non-empty string`);
    }
  }

  if (!STATUSES.includes(body.status)) {
    errors.push(`status must be one of ${STATUSES.join(', ')}`);
  }

  for (const field of ['lat', 'lng']) {
    if (typeof body[field] !== 'number' || !Number.isFinite(body[field])) {
      errors.push(`${field} must be a finite number`);
    }
  }

  if (typeof body.timestamp !== 'string' || Number.isNaN(Date.parse(body.timestamp))) {
    errors.push('timestamp must be an ISO-8601 string');
  }

  if (body.notes !== undefined && body.notes !== null && typeof body.notes !== 'string') {
    errors.push('notes must be a string when present');
  }

  return { errors };
}

exports.ingestFinding = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed', details: ['use POST'] });
    return;
  }

  const { errors } = validate(req.body);
  if (errors.length > 0) {
    res.status(400).json({ error: 'invalid payload', details: errors });
    return;
  }

  const findingId = db.collection('findings').doc().id;
  const message = {
    findingId,
    reporterId: req.body.reporterId,
    emergencyId: req.body.emergencyId,
    personName: req.body.personName,
    status: req.body.status,
    lat: req.body.lat,
    lng: req.body.lng,
    notes: typeof req.body.notes === 'string' ? req.body.notes : '',
    timestamp: req.body.timestamp,
    receivedAt: new Date().toISOString(),
  };

  try {
    await pubsub.topic(TOPIC).publishMessage({ json: message });
  } catch (err) {
    logger.error('failed to publish finding', { findingId, err });
    res.status(500).json({ error: 'failed to publish finding' });
    return;
  }

  res.status(200).json({ findingId });
});

exports.consolidateFinding = onMessagePublished(TOPIC, async (event) => {
  // Descartar en vez de lanzar: un mensaje corrupto reintentaria para siempre.
  let message;
  try {
    message = event.data.message.json;
  } catch (err) {
    message = null;
  }
  if (!message || typeof message !== 'object' || !message.findingId) {
    logger.error('discarding undecodable pubsub message', { id: event.data.message.messageId });
    return;
  }

  const { findingId, emergencyId, personName, status, lat, lng, notes } = message;

  await db.collection('findings').doc(findingId).set({
    reporterId: message.reporterId,
    emergencyId,
    personName,
    status,
    lat,
    lng,
    notes: notes || '',
    timestamp: Timestamp.fromDate(new Date(message.timestamp)),
    receivedAt: Timestamp.fromDate(new Date(message.receivedAt)),
  });

  const personRef = db.collection('people').doc(emergencyId);
  const becameSafe = await db.runTransaction(async (tx) => {
    const snapshot = await tx.get(personRef);
    const previousStatus = snapshot.exists ? snapshot.data().status : null;

    tx.set(personRef, {
      name: personName,
      status,
      lat,
      lng,
      lastSeenText: notes || '',
      reportCount: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    return status === 'SAFE' && previousStatus !== 'SAFE';
  });

  if (becameSafe) {
    await db.collection('alerts').add({
      icon: 'check_circle',
      title: `${personName} marcado a salvo`,
      body: 'Un reporte cercano confirmo que esta persona esta a salvo.',
      tone: 'SAFE',
      createdAt: FieldValue.serverTimestamp(),
    });
  }
});
