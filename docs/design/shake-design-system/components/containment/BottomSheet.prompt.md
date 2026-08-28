One-line: a bottom sheet for map detail, filters and multi-option choices on a phone.

```jsx
<BottomSheet title="Filter reports" onDismiss={close}>…</BottomSheet>
```

Always keep the 32×4dp handle — it is the only affordance saying the sheet drags. Radius is 28dp on the top corners only. Use instead of Dialog whenever the content is a list.
