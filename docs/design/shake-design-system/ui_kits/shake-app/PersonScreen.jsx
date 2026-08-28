const { TopAppBar, IconButton, Avatar, StatusChip, Button, Card, ListItem, Divider, Dialog, Icon, Chip } = window.ShakeDesignSystem_bf929b;
function PersonScreen({person,onBack,onMarkSafe}){
  const[ask,setAsk]=React.useState(false);
  return <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',position:'relative',background:'var(--md-surface)'}}>
    <TopAppBar title={person.name} leadingIcon="arrow_back" onLeading={onBack}
      actions={<><IconButton icon="share" label="Share"/><IconButton icon="bookmark" label="Follow" selected/><IconButton icon="more_vert" label="More"/></>}/>
    <div style={{flex:1,overflowY:'auto',padding:'0 16px 24px'}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12,padding:'8px 0 20px'}}>
        <Avatar name={person.name} size={96} status={person.status}/>
        <div style={{font:'var(--type-headline-small)'}}>{person.name}</div>
        <StatusChip status={person.status}/>
        <div style={{font:'var(--type-body-small)',color:'var(--md-on-surface-variant)'}}>Age {person.age} · {person.relation} · updated {person.updated}</div>
      </div>
      <div style={{display:'flex',gap:8,marginBottom:16}}>
        <Button variant="tonal" icon="call" style={{flex:1}}>Call</Button>
        <Button variant="tonal" icon="directions" style={{flex:1}}>Route</Button>
        <Button icon="check_circle" onClick={()=>setAsk(true)} style={{flex:1.4}}>Found safe</Button>
      </div>
      <Card variant="outlined" flush style={{marginBottom:16}}>
        <ListItem leading={<Icon name="location_on" size={24} color="var(--md-on-surface-variant)"/>} headline={person.lastSeen} supporting="Last confirmed location" divider/>
        <ListItem leading={<Icon name="call" size={24} color="var(--md-on-surface-variant)"/>} headline={person.phone} supporting="Contact number" divider/>
        <ListItem leading={<Icon name="fact_check" size={24} color="var(--md-on-surface-variant)"/>} headline={person.reports+' independent reports'} supporting="2 from verified responders"/>
      </Card>
      <div style={{font:'var(--type-title-small)',color:'var(--md-on-surface-variant)',margin:'0 0 8px 4px',textTransform:'uppercase',letterSpacing:'0.8px'}}>Timeline</div>
      <Card variant="outlined" flush>
        {[['schedule','04:20 · Left Sakae 3-chome office','Reported by a colleague'],
          ['radar','05:02 · Phone last on network','Cell tower 3 blocks east'],
          ['person_search','06:14 · Search team assigned','Team 7, Naka-ku sector']].map(([ic,h,s],i)=>
          <ListItem key={i} leading={<Icon name={ic} size={24} color="var(--md-primary)"/>} headline={h} supporting={s} divider={i<2}/>)}
      </Card>
    </div>
    <Dialog open={ask} icon="check_circle" headline={'Mark '+person.name.split(' ')[0]+' as found safe?'}
      supporting="Everyone following this record is notified immediately. You can undo this for five minutes."
      onDismiss={()=>setAsk(false)}
      actions={<><Button variant="text" onClick={()=>setAsk(false)}>Cancel</Button><Button onClick={()=>{setAsk(false);onMarkSafe()}}>Confirm</Button></>}/>
  </div>;
}
Object.assign(window,{PersonScreen});
