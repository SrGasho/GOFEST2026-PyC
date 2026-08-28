One-line: icon-only 40dp target for app bars and row affordances.

```jsx
<IconButton icon="arrow_back" label="Back"/>
<IconButton icon="bookmark" label="Follow" selected variant="standard"/>
```

Container is 40dp but the touch target must stay 48dp — pad the parent. Standard variant for app bars; tonal when it sits alone on a card.
