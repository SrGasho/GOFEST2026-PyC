const { TopAppBar, Avatar, StatusChip, Button, Card, ListItem, Icon, Switch, Divider } = window.ShakeDesignSystem_bf929b;
function MeScreen({safe,onSafe,profile,beaconOn,onProfile,onBeacon}){
  return <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',background:'var(--md-surface)'}}>
    <TopAppBar title="Me" actions={<Icon name="settings" size={24} style={{margin:'0 12px',color:'var(--md-on-surface-variant)'}}/>}/>
    <div style={{flex:1,overflowY:'auto',padding:'0 16px 24px',display:'flex',flexDirection:'column',gap:16}}>
      <Card variant={safe?'filled':'elevated'} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:14,padding:'24px 20px',
        background:safe?'var(--status-safe-container)':'var(--md-surface-container-low)'}}>
        <Avatar name={profile.name} size={72} status={safe?'safe':'unconfirmed'}/>
        <div style={{font:'var(--type-title-large)'}}>{profile.name}</div>
        <StatusChip status={safe?'safe':'unconfirmed'} label={safe?'Marked safe':'Not yet marked'}/>
        <p style={{font:'var(--type-body-medium)',color:safe?'var(--status-on-safe-container)':'var(--md-on-surface-variant)',textAlign:'center'}}>
          {safe?'Your 12 contacts were notified at 04:31. Update this if your situation changes.':'Six people are following your status. One tap tells all of them you are alright.'}</p>
        {!safe&&<Button size="lg" fullWidth icon="check_circle" onClick={onSafe}>I’m safe</Button>}
        {safe&&<Button variant="outlined" fullWidth icon="edit" onClick={onSafe}>Change my status</Button>}
      </Card>
      <Card variant="outlined" flush>
        <ListItem onClick={onBeacon} divider trailingIcon="chevron_right"
          leading={<span style={{display:'grid',placeItems:'center',width:40,height:40,borderRadius:'var(--shape-full)',background:beaconOn?'var(--md-error-container)':'var(--md-secondary-container)',color:beaconOn?'var(--md-on-error-container)':'var(--md-on-secondary-container)'}}><Icon name="wifi_tethering" size={22} fill={beaconOn}/></span>}
          headline="Beacon mode" supporting={beaconOn?'Broadcasting now':'Off · permission required'}/>
        <ListItem onClick={onProfile} divider trailingIcon="chevron_right"
          leading={<Icon name="badge" size={24} color="var(--md-on-surface-variant)"/>}
          headline="Emergency profile" supporting={`${profile.blood||'No blood type'} · ${profile.allergies||'No allergies recorded'}`}/>
        <ListItem leading={<Icon name="group" size={24} color="var(--md-on-surface-variant)"/>} headline="People following me" supporting="12 contacts" trailingIcon="chevron_right" divider/>
        <ListItem leading={<Icon name="bookmark" size={24} color="var(--md-on-surface-variant)"/>} headline="People I follow" supporting="6 records" trailingIcon="chevron_right" divider/>
        <ListItem leading={<Icon name="history" size={24} color="var(--md-on-surface-variant)"/>} headline="My reports" supporting="2 submitted" trailingIcon="chevron_right"/>
      </Card>
      <Card variant="filled">
        <div style={{font:'var(--type-title-medium)',marginBottom:4}}>Privacy</div>
        <Switch label="Share location with responders" checked onChange={()=>{}}/>
        <Switch label="Show my phone number on my record" checked={false} onChange={()=>{}}/>
        <Switch label="Work offline over mesh" checked onChange={()=>{}}/>
      </Card>
    </div></div>;
}
Object.assign(window,{MeScreen});
