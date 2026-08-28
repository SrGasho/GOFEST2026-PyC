One-line: the workhorse row for person registries, alerts and settings.

```jsx
<ListItem leading={<Avatar name="Mei Tanaka"/>} headline="Mei Tanaka" supporting="Last seen — Sakae 3-chome" trailing={<StatusChip status="missing"/>} divider onClick={open}/>
```

Two lines is the default for person records. Keep the trailing slot to one element; a status chip and a timestamp together will wrap on a 412dp phone.
