One-line: multi-select and deferred-commit consent.

```jsx
<Checkbox label="I confirm this report is accurate" supporting="False reports slow responders down" checked={ok} onChange={setOk}/>
```

Use `error` on a required consent that was skipped. For an immediate setting use Switch, not Checkbox.
