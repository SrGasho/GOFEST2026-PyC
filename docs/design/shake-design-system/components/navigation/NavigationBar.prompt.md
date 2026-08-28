One-line: the persistent bottom bar — Shake ships four destinations: Nearby, Search, Alerts, Me.

```jsx
<NavigationBar value={tab} onChange={setTab} items={[{value:"nearby",label:"Nearby",icon:"near_me"},{value:"search",label:"Search",icon:"person_search"},{value:"alerts",label:"Alerts",icon:"notifications",badge:3},{value:"me",label:"Me",icon:"account_circle"}]}/>
```

The active icon is filled and sits in a secondary-container pill; the label goes bold. Never fewer than 3 or more than 5 destinations.
