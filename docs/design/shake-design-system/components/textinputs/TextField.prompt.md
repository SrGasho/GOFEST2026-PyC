One-line: the only text input — outlined by default in Shake forms.

```jsx
<TextField label="Full name" value={n} onChange={setN} supporting="As it appears on any ID"/>
<TextField variant="filled" label="Phone" leadingIcon="call" error errorText="Include the country code"/>
```

Outlined on white report forms; filled inside sheets and dense settings. Always supply `supporting` on a field that can fail — the error text replaces it in place, so the layout never jumps.
