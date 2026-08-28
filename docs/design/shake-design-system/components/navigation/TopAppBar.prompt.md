One-line: the top bar for each destination; large variant for a screen root, small for pushed detail views.

```jsx
<TopAppBar variant="large" title="People nearby" subtitle="1,284 reports"/>
<TopAppBar title="Mei Tanaka" leadingIcon="arrow_back" actions={<IconButton icon="share" label="Share"/>}/>
```

Max two trailing actions plus overflow. Set `scrolled` when content is behind the bar — it swaps surface for surface-container, which is the only elevation cue M3 uses here.
