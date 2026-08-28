One-line: confirms an action that already happened and offers exactly one undo.

```jsx
<Snackbar message="Report submitted \u2014 responders notified" action="Undo" onAction={undo}/>
```

Bottom: 96dp so it clears the navigation bar. One line of text, one action. Anything that needs a decision is a Dialog, not a Snackbar.
