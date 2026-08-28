One-line: the composed registry row — use this rather than assembling ListItem + Avatar + StatusChip by hand.

```jsx
<PersonRow name="Mei Tanaka" status="missing" lastSeen="Sakae 3-chome, Naka-ku" updated="8 min ago" distance="1.2 km" onClick={open}/>
```

88dp, three lines. It is the one place where a status chip and a timestamp share a row, and the layout is tuned for a 412dp phone — do not add a fourth element.
