One-line: filters one list between 2–5 exclusive views; the selected segment gains a check.

```jsx
<SegmentedButton value={v} onChange={setV} options={[{value:"all",label:"All"},{value:"missing",label:"Missing"},{value:"safe",label:"Safe"}]}/>
```

Use over Tabs when the options filter the same list rather than switch destinations. Never more than 5 segments on a phone.
