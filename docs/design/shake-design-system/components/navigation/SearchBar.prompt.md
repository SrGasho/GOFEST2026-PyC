One-line: the persistent search entry on the registry screen.

```jsx
<SearchBar value={q} onChange={setQ} placeholder="Name, phone or last-seen area" trailing={<IconButton icon="tune" label="Filters"/>}/>
```

Never put a search bar inside a TopAppBar — in Shake it replaces the bar on the Search destination. Placeholder states what is searchable, not the word "Search".
