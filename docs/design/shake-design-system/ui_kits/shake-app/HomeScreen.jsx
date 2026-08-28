const { TopAppBar, IconButton, Card, Button, StatusChip, Icon, Divider, ListItem, Chip, ProgressIndicator, Avatar } = window.ShakeDesignSystem_bf929b;

function Step({n,icon,title,body,done,onToggle}){
  return <div onClick={onToggle} style={{display:'flex',gap:12,alignItems:'flex-start',padding:'12px 16px',cursor:'pointer',
    background:done?'var(--status-safe-container)':'transparent',transition:'background-color var(--dur-short-4) var(--ease-standard)'}}>
    <span style={{display:'grid',placeItems:'center',width:32,height:32,flex:'0 0 auto',borderRadius:'var(--shape-full)',
      background:done?'var(--status-safe)':'var(--md-secondary-container)',color:done?'#fff':'var(--md-on-secondary-container)'}}>
      <Icon name={done?'check':icon} size={18} fill/></span>
    <div style={{flex:1,minWidth:0}}>
      <div style={{font:'var(--type-title-small)',letterSpacing:'var(--tracking-title-small)',color:done?'var(--status-on-safe-container)':'var(--md-on-surface)'}}>{n}. {title}</div>
      <div style={{font:'var(--type-body-small)',letterSpacing:'var(--tracking-body-small)',color:done?'var(--status-on-safe-container)':'var(--md-on-surface-variant)',marginTop:2}}>{body}</div>
    </div></div>;
}

function EventHome({data,onBeacon,onSafe,onMap,safe}){
  const[done,setDone]=React.useState([]);
  const t=i=>setDone(d=>d.includes(i)?d.filter(x=>x!==i):[...d,i]);
  const steps=[
    ['shield','Drop, cover, hold on','Stay down until the shaking fully stops. Do not run outside.'],
    ['health_and_safety','Check yourself for injuries','Then check anyone within arm’s reach.'],
    ['check_circle','Tell people you are safe','One tap notifies your 12 contacts.'],
    ['door_open','Clear your exit route','Open the door. Move away from glass and shelves.'],
    ['water_drop','Turn off gas and water','Only if you can reach the valve safely.']];
  const missing=data.people.filter(p=>p.status==='missing'||p.status==='injured').length;
  return <div style={{flex:1,overflowY:'auto',background:'var(--md-surface)'}}>
    <div style={{background:'var(--md-error-container)',color:'var(--md-on-error-container)',padding:'20px 16px 24px'}}>
      <div style={{display:'flex',alignItems:'center',gap:8,font:'var(--type-label-large)',letterSpacing:'0.8px',textTransform:'uppercase'}}>
        <Icon name="crisis_alert" size={20} fill style={{animation:'shake-pulse 2s var(--ease-standard) infinite'}}/>Earthquake detected · 41 min ago</div>
      <div style={{display:'flex',alignItems:'baseline',gap:10,marginTop:8}}>
        <span style={{font:'var(--type-display-large)',letterSpacing:'var(--tracking-display-large)',lineHeight:1}}>M{data.event.magnitude}</span>
        <span style={{font:'var(--type-title-medium)'}}>Shindo 5+</span></div>
      <div style={{font:'var(--type-body-medium)',marginTop:4,opacity:.85}}>{data.event.place} · {data.event.time}</div>
      <div style={{display:'flex',gap:3,alignItems:'flex-end',height:28,marginTop:14}}>
        {[1,2,3,4,5,6,7].map(i=><span key={i} style={{flex:1,height:8+i*3,borderRadius:2,
          background:i<=data.event.level?`var(--seismic-${i})`:'color-mix(in srgb,currentColor 18%,transparent)'}}/>)}</div>
      <div style={{display:'flex',justifyContent:'space-between',font:'var(--type-label-small)',letterSpacing:'0.5px',marginTop:6,opacity:.75}}>
        <span>WEAK</span><span>SEVERE</span></div>
      <div style={{display:'flex',gap:8,marginTop:18}}>
        <Button size="lg" icon="check_circle" onClick={onSafe} disabled={safe} style={{flex:1}}>{safe?'You are safe':'I’m safe'}</Button>
        <Button size="lg" variant="danger" icon="sos" onClick={onBeacon} style={{flex:'0 0 auto',padding:'0 22px'}}>SOS</Button></div>
    </div>
    <div style={{padding:'20px 16px 8px',font:'var(--type-title-medium)',letterSpacing:'var(--tracking-title-medium)'}}>Do this now</div>
    <Card variant="outlined" flush style={{margin:'0 16px 16px'}}>
      {steps.map(([ic,ti,bo],i)=><React.Fragment key={i}>
        <Step n={i+1} icon={ic} title={ti} body={bo} done={done.includes(i)} onToggle={()=>t(i)}/>
        {i<steps.length-1&&<Divider inset={60}/>}</React.Fragment>)}
    </Card>
    <Card variant="filled" interactive onClick={onMap} style={{margin:'0 16px 16px',display:'flex',alignItems:'center',gap:14}}>
      <span style={{display:'grid',placeItems:'center',width:44,height:44,borderRadius:'var(--shape-full)',background:'var(--status-missing-container)',color:'var(--status-on-missing-container)'}}>
        <Icon name="person_search" size={24} fill/></span>
      <div style={{flex:1}}>
        <div style={{font:'var(--type-title-small)'}}>{missing} people unaccounted for near you</div>
        <div style={{font:'var(--type-body-small)',color:'var(--md-on-surface-variant)',marginTop:2}}>Within 5 km · updated 2 min ago</div></div>
      <Icon name="chevron_right" size={24} color="var(--md-on-surface-variant)"/>
    </Card>
    <div style={{padding:'0 16px 24px',display:'flex',gap:8,flexWrap:'wrap'}}>
      <Chip type="assist" icon="home_work" label="Nearest shelter · 900 m"/>
      <Chip type="assist" icon="water_drop" label="Water points"/>
      <Chip type="assist" icon="signal_disconnected" label="Mesh mode on"/>
    </div></div>;
}

function CalmHome({data,onBeacon,onProfile,onTest,profilePct}){
  return <div style={{flex:1,overflowY:'auto',background:'var(--md-surface)'}}>
    <div style={{background:'var(--status-safe-container)',color:'var(--status-on-safe-container)',padding:'20px 16px'}}>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <Icon name="check_circle" size={22} fill/>
        <span style={{font:'var(--type-title-medium)',letterSpacing:'var(--tracking-title-medium)'}}>No active seismic events</span></div>
      <div style={{font:'var(--type-body-small)',marginTop:4,opacity:.8}}>Nagoya · Naka-ku. Last checked 30 seconds ago.</div>
    </div>
    <div style={{padding:'16px 16px 8px',font:'var(--type-title-medium)'}}>Advisories</div>
    <Card variant="outlined" flush style={{margin:'0 16px 20px'}}>
      <ListItem lines={3} divider leading={<span style={{display:'grid',placeItems:'center',width:40,height:40,borderRadius:'var(--shape-full)',background:'var(--md-caution-container)',color:'var(--md-on-caution-container)'}}><Icon name="warning" size={22} fill/></span>}
        headline="Aftershock watch — 72 hours" supporting="Elevated probability of M4+ in the Nagoya basin."/>
      <ListItem lines={3} divider leading={<span style={{display:'grid',placeItems:'center',width:40,height:40,borderRadius:'var(--shape-full)',background:'var(--md-secondary-container)',color:'var(--md-on-secondary-container)'}}><Icon name="rainy" size={22} fill/></span>}
        headline="Heavy rain from 18:00" supporting="Landslide risk on slopes weakened last month."/>
      <ListItem lines={3} leading={<span style={{display:'grid',placeItems:'center',width:40,height:40,borderRadius:'var(--shape-full)',background:'var(--md-secondary-container)',color:'var(--md-on-secondary-container)'}}><Icon name="campaign" size={22} fill/></span>}
        headline="City drill — Thursday 10:00" supporting="A test alert will reach this phone. No action needed."/>
    </Card>
    <div style={{padding:'0 16px 8px',font:'var(--type-title-medium)'}}>Be ready</div>
    <div style={{padding:'0 16px 20px',display:'flex',flexDirection:'column',gap:12}}>
      <Card variant="filled" interactive onClick={onProfile}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <Icon name="badge" size={24} color="var(--md-on-surface-variant)"/>
          <div style={{flex:1}}><div style={{font:'var(--type-title-small)'}}>Emergency profile {profilePct}% complete</div>
          <div style={{font:'var(--type-body-small)',color:'var(--md-on-surface-variant)',marginTop:2}}>Blood type and allergies are missing. Responders read this first.</div></div>
          <Icon name="chevron_right" size={24} color="var(--md-on-surface-variant)"/></div>
        <div style={{marginTop:12}}><ProgressIndicator value={profilePct}/></div>
      </Card>
      <Card variant="filled" interactive onClick={onTest}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <Icon name="wifi_tethering" size={24} color="var(--md-on-surface-variant)"/>
          <div style={{flex:1}}><div style={{font:'var(--type-title-small)'}}>Test your beacon</div>
          <div style={{font:'var(--type-body-small)',color:'var(--md-on-surface-variant)',marginTop:2}}>A 30-second silent broadcast. Nobody is alerted.</div></div>
          <Icon name="chevron_right" size={24} color="var(--md-on-surface-variant)"/></div>
      </Card>
      <Card variant="filled" interactive>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <Icon name="backpack" size={24} color="var(--md-on-surface-variant)"/>
          <div style={{flex:1}}><div style={{font:'var(--type-title-small)'}}>Go-bag checklist</div>
          <div style={{font:'var(--type-body-small)',color:'var(--md-on-surface-variant)',marginTop:2}}>7 of 14 items confirmed. Water expires in 3 months.</div></div>
          <Icon name="chevron_right" size={24} color="var(--md-on-surface-variant)"/></div>
      </Card>
    </div>
    <div style={{padding:'0 16px 24px'}}>
      <Button variant="outlined" fullWidth icon="sos" onClick={onBeacon}>Open beacon</Button></div>
  </div>;
}

function HomeScreen(props){
  const {data,eventActive,onToggleEvent}=props;
  return <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
    <div style={{display:'flex',alignItems:'center',height:'var(--top-app-bar-h)',padding:'0 4px',flexShrink:0,background:'var(--md-surface)'}}>
      <div style={{flex:1,display:'flex',alignItems:'center'}}></div>
      <img src="../../assets/logo-shield.png" alt="Shake" style={{height:30,display:'block',flexShrink:0}}/>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'flex-end',gap:4}}>
        <IconButton icon="bolt" label="Simulate event" selected={eventActive} onClick={onToggleEvent}/>
        <IconButton icon="more_vert" label="More"/>
      </div>
    </div>
    {eventActive?<EventHome {...props}/>:<CalmHome {...props}/>}
  </div>;
}
Object.assign(window,{HomeScreen});
