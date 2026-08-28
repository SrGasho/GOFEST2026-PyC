One-line: switches between peer content areas inside one destination.

```jsx
<Tabs value={t} onChange={setT} items={[{value:"reports",label:"Reports"},{value:"shelters",label:"Shelters"}]}/>
```

Primary indicator is a 56dp bar under the label; secondary is full width. Tabs never replace the NavigationBar — they live below the app bar.
