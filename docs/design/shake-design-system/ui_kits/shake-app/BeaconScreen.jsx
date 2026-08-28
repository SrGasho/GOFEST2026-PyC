const DS=window.ShakeDesignSystem_bf929b;
const { TopAppBar, IconButton, BeaconControl, SegmentedButton, Card, Button, Icon, BottomSheet, ListItem, Divider, Switch, StatusChip } = window.ShakeDesignSystem_bf929b;
function BeaconScreen({onBack,granted,onGrant,profile,active,mode,onMode,onStart,onStop}){
  const[ask,setAsk]=React.useState(!granted);
  return <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',position:'relative',background:'var(--md-surface)'}}>
    <TopAppBar title="Beacon" leadingIcon="arrow_back" onLeading={onBack} actions={<IconButton icon="help" label="How beacons work"/>}/>
    <div style={{flex:1,overflowY:'auto',padding:'8px 16px 24px',display:'flex',flexDirection:'column',gap:20}}>
      <SegmentedButton value={mode} onChange={onMode} options={[{value:'sos',label:'SOS'},{value:'search',label:'Searching'}]}/>
      <div style={{display:'grid',placeItems:'center',padding:'12px 0'}}>
        <BeaconControl mode={mode} active={active} disabled={!granted} onActivate={onStart} onStop={onStop}/>
      </div>
      {active&&<Card variant="filled" style={{background:mode==='sos'?'var(--md-error-container)':'var(--md-primary-container)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <Icon name="wifi_tethering" size={20} fill/>
          <span style={{font:'var(--type-title-small)'}}>Broadcasting for 4 min 12 s</span></div>
        <div style={{font:'var(--type-body-small)',marginTop:6,opacity:.85}}>Reaching 3 nearby phones over mesh and 1 cell tower. Battery cost so far: 2%.</div>
      </Card>}
      <div>
        <div style={{font:'var(--type-title-small)',color:'var(--md-on-surface-variant)',textTransform:'uppercase',letterSpacing:'0.8px',margin:'0 4px 8px'}}>What your beacon sends</div>
        <Card variant="outlined" flush>
          <ListItem divider leading={<Icon name="person" size={24} color="var(--md-on-surface-variant)"/>} headline={profile.name} supporting="Name and age"/>
          <ListItem divider leading={<Icon name="bloodtype" size={24} color="var(--md-error)"/>} headline={profile.blood||'Not set'} supporting="Blood type"/>
          <ListItem divider leading={<Icon name="allergies" size={24} color="var(--md-on-surface-variant)"/>} headline={profile.allergies||'None recorded'} supporting="Allergies and conditions"/>
          <ListItem divider leading={<Icon name="location_on" size={24} color="var(--md-on-surface-variant)"/>} headline="35.1815, 136.9066 · ±8 m" supporting="Last known position"/>
          <ListItem leading={<Icon name="battery_5_bar" size={24} color="var(--md-on-surface-variant)"/>} headline="68%" supporting="Battery, so responders know how long you can be reached"/>
        </Card>
      </div>
      <Card variant="filled">
        <div style={{font:'var(--type-title-medium)',marginBottom:6}}>Beacon settings</div>
        <Switch label="Keep broadcasting when screen is off" checked onChange={()=>{}}/>
        <Switch label="Relay other people’s beacons" checked onChange={()=>{}}/>
        <Switch label="Audible pulse every 30 s" checked={false} onChange={()=>{}}/>
      </Card>
    </div>
    <BottomSheet open={ask} title="Allow beacon mode?" onDismiss={()=>setAsk(false)}>
      <p style={{font:'var(--type-body-medium)',color:'var(--md-on-surface-variant)',marginBottom:16}}>
        Beacon mode broadcasts your position and emergency profile so responders and nearby phones can find you. It works without a network by relaying through other Shake phones.</p>
      <Card variant="outlined" flush style={{marginBottom:16}}>
        <ListItem divider leading={<Icon name="my_location" size={24} color="var(--md-primary)"/>} headline="Precise location" supporting="While a beacon is active only" lines={2}/>
        <ListItem divider leading={<Icon name="bluetooth" size={24} color="var(--md-primary)"/>} headline="Nearby devices" supporting="To relay over mesh when there is no signal" lines={2}/>
        <ListItem divider leading={<Icon name="notifications_active" size={24} color="var(--md-primary)"/>} headline="Background activity" supporting="So the beacon keeps running with the screen off" lines={2}/>
        <ListItem leading={<Icon name="badge" size={24} color="var(--md-primary)"/>} headline="Emergency profile" supporting="Name, age, blood type and allergies" lines={2}/>
      </Card>
      <p style={{font:'var(--type-body-small)',color:'var(--md-on-surface-variant)',marginBottom:16}}>
        Nothing is broadcast until you start a beacon. You can revoke this at any time in Me → Privacy.</p>
      <div style={{display:'flex',gap:8}}>
        <Button variant="text" onClick={()=>setAsk(false)} style={{flex:1}}>Not now</Button>
        <Button icon="check" onClick={()=>{onGrant();setAsk(false)}} style={{flex:1.6}}>Allow beacon mode</Button></div>
    </BottomSheet>
  </div>;
}
Object.assign(window,{BeaconScreen});
