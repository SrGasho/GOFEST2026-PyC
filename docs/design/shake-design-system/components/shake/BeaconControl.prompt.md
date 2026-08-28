One-line: the single largest target in the product — activates or stops a beacon broadcast.

```jsx
<BeaconControl mode="sos" active={on} onActivate={start} onStop={stop}/>
<BeaconControl mode="search" disabled/>
```

Never place two of these on one screen; the mode is chosen before the control is shown. Disabled until beacon permission is granted — the permission sheet is the only thing that may appear over it. SOS is error red, search is primary blue, and the ripple only runs while actually broadcasting.
