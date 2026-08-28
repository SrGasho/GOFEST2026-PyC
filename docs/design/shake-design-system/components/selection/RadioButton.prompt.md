One-line: a single choice where every option must stay visible — relationship to the person, report source.

```jsx
<RadioButton value="family" checked={rel==="family"} onChange={setRel} label="Family member"/>
```

Use when the options carry weight and need supporting text. For 2–5 short filters use SegmentedButton; for many options use a BottomSheet list.
