One-line: a continuous range with a live readout.

```jsx
<Slider label="Search radius" valueLabel="2.5 km" value={r} onChange={setR} min={1} max={20}/>
```

Always pair with `valueLabel` — an unlabelled slider is unusable when the result is a distance or a count.
