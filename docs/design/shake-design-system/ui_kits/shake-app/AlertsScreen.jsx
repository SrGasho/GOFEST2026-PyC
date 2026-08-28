const { TopAppBar, ListItem, Icon, Avatar, Divider, Card, Button, Switch, Badge } = window.ShakeDesignSystem_bf929b;
function AlertsScreen({data}){
  const tone={error:['var(--md-error-container)','var(--md-on-error-container)'],safe:['var(--status-safe-container)','var(--status-on-safe-container)'],neutral:['var(--md-secondary-container)','var(--md-on-secondary-container)']};
  return <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',background:'var(--md-surface)'}}>
    <TopAppBar variant="large" title="Alerts" subtitle="Nagoya event · M6.4"/>
    <div style={{flex:1,overflowY:'auto',paddingBottom:16}}>
      {data.alerts.map((a,i)=>{const[bg,fg]=tone[a.tone];return <ListItem key={a.id} lines={3} divider={i<data.alerts.length-1}
        leading={<span style={{display:'grid',placeItems:'center',width:40,height:40,borderRadius:'var(--shape-full)',background:bg,color:fg}}><Icon name={a.icon} size={22} fill/></span>}
        headline={a.title} supporting={a.body} trailing={<span>{a.time}</span>}/>;})}
      <div style={{padding:'16px'}}>
        <Card variant="filled">
          <div style={{font:'var(--type-title-medium)',marginBottom:4}}>Alert settings</div>
          <Switch label="Aftershock warnings" checked onChange={()=>{}}/>
          <Switch label="Updates on people I follow" checked onChange={()=>{}}/>
          <Switch label="Shelter capacity changes" checked={false} onChange={()=>{}}/>
        </Card>
      </div>
    </div></div>;
}
Object.assign(window,{AlertsScreen});
