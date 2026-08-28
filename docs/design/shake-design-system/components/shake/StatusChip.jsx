import React from 'react';
import { Icon } from '../actions/Icon.jsx';
const S={
  safe:{bg:'var(--status-safe-container)',fg:'var(--status-on-safe-container)',icon:'check_circle',label:'Safe'},
  missing:{bg:'var(--status-missing-container)',fg:'var(--status-on-missing-container)',icon:'help',label:'Missing'},
  unconfirmed:{bg:'var(--status-unconfirmed-container)',fg:'var(--status-on-unconfirmed-container)',icon:'schedule',label:'Unconfirmed'},
  injured:{bg:'var(--status-injured-container)',fg:'var(--status-on-injured-container)',icon:'personal_injury',label:'Injured'},
  searching:{bg:'var(--status-searching-container)',fg:'var(--status-on-searching-container)',icon:'radar',label:'Searching'}
};
export function StatusChip({status='unconfirmed',label,size='md',style,...rest}){
  const s=S[status]||S.unconfirmed;const sm=size==='sm';
  return <span {...rest} style={{display:'inline-flex',alignItems:'center',gap:sm?4:6,height:sm?24:32,padding:sm?'0 8px 0 6px':'0 12px 0 8px',
    background:s.bg,color:s.fg,borderRadius:'var(--shape-chip)',
    font:sm?'var(--type-label-medium)':'var(--type-label-large)',letterSpacing:sm?'var(--tracking-label-medium)':'var(--tracking-label-large)',
    whiteSpace:'nowrap',...style}}>
    <Icon name={s.icon} size={sm?14:18} fill/>{label||s.label}</span>;
}
