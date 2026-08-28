const { NavigationBar, Snackbar } = window.ShakeDesignSystem_bf929b;
function PhoneFrame({children}){
  return <div style={{position:'relative',width:'var(--phone-w)',height:'var(--phone-h)',maxHeight:'100%',background:'var(--md-surface)',
    borderRadius:44,boxShadow:'var(--elevation-5)',overflow:'hidden',display:'flex',flexDirection:'column',border:'8px solid #111318'}}>
    <div style={{height:32,flex:'0 0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 22px',
      font:'var(--type-label-medium)',color:'var(--md-on-surface)',background:'var(--md-surface)'}}>
      <span>04:53</span><span style={{display:'flex',gap:5}}><span className="shake-icon" style={{fontSize:15}}>signal_cellular_alt</span><span className="shake-icon" style={{fontSize:15}}>wifi</span><span className="shake-icon" style={{fontSize:15}}>battery_5_bar</span></span></div>
    {children}</div>;
}
class Boundary extends React.Component{
  constructor(p){super(p);this.state={err:null}}
  static getDerivedStateFromError(err){return{err}}
  render(){if(!this.state.err)return this.props.children;
    return <div style={{flex:1,display:'grid',placeItems:'center',padding:32,textAlign:'center',color:'var(--md-on-surface-variant)'}}>
      <div><span className="shake-icon" style={{fontSize:40}}>error</span>
      <p style={{marginTop:8,font:'var(--type-body-medium)'}}>This screen failed to render.<br/>{String(this.state.err.message||this.state.err)}</p></div></div>}
}
function App(){
  const data=window.SHAKE_DATA;
  const[tab,setTab]=React.useState('home');
  const[stack,setStack]=React.useState(null);
  const[eventActive,setEventActive]=React.useState(true);
  const[safe,setSafe]=React.useState(false);
  const[snack,setSnack]=React.useState(null);
  const[people,setPeople]=React.useState(data.people);
  const[granted,setGranted]=React.useState(false);
  const[beaconOn,setBeaconOn]=React.useState(false);
  const[mode,setMode]=React.useState('sos');
  const[profile,setProfile]=React.useState(data.profile);
  const d={...data,people,event:{...data.event,active:eventActive}};
  const open=id=>setStack({screen:'person',id});
  const markSafe=id=>{setPeople(ps=>ps.map(p=>p.id===id?{...p,status:'safe',updated:'just now'}:p));setStack(null);setSnack('Record updated — 8 followers notified');};
  const pct=Math.round(100*['name','age','blood','allergies','conditions'].filter(k=>profile[k]).length/5);
  let body;
  if(stack&&stack.screen==='person'){const p=people.find(x=>x.id===stack.id);body=<PersonScreen person={p} onBack={()=>setStack(null)} onMarkSafe={()=>markSafe(p.id)}/>;}
  else if(stack&&stack.screen==='report')body=<ReportScreen onBack={()=>setStack(null)} onSubmit={n=>{setStack(null);setSnack('Report for '+n+' submitted')}}/>;
  else if(stack&&stack.screen==='beacon')body=<BeaconScreen onBack={()=>setStack(null)} granted={granted} onGrant={()=>{setGranted(true);setSnack('Beacon mode allowed')}}
    profile={profile} active={beaconOn} mode={mode} onMode={setMode}
    onStart={()=>{setBeaconOn(true);setSnack(mode==='sos'?'SOS beacon broadcasting':'Search beacon broadcasting')}}
    onStop={()=>{setBeaconOn(false);setSnack('Beacon stopped')}}/>;
  else if(stack&&stack.screen==='profile')body=<ProfileScreen onBack={()=>setStack(null)} profile={profile} onSave={p=>{setProfile(p);setStack(null);setSnack('Emergency profile saved')}}/>;
  else if(tab==='home')body=<HomeScreen data={d} eventActive={eventActive} onToggleEvent={()=>setEventActive(v=>!v)}
    safe={safe} profilePct={pct}
    onSafe={()=>{setSafe(true);setSnack('You are marked safe — 12 contacts notified')}}
    onBeacon={()=>setStack({screen:'beacon'})} onProfile={()=>setStack({screen:'profile'})}
    onTest={()=>setSnack('Test beacon sent — nobody was alerted')} onMap={()=>setTab('search')}/>;
  else if(tab==='search')body=<SearchScreen data={d} onOpen={open}/>;
  else if(tab==='alerts')body=<AlertsScreen data={d}/>;
  else body=<MeScreen safe={safe} profile={profile} beaconOn={beaconOn} onProfile={()=>setStack({screen:'profile'})}
    onBeacon={()=>setStack({screen:'beacon'})} onSafe={()=>{setSafe(s=>!s);setSnack(safe?'Status cleared':'You are marked safe — 12 contacts notified')}}/>;
  React.useEffect(()=>{if(!snack)return;const t=setTimeout(()=>setSnack(null),3200);return()=>clearTimeout(t)},[snack]);
  return <PhoneFrame>
    <Boundary key={(stack&&stack.screen)||tab}>{body}</Boundary>
    {!stack&&<NavigationBar value={tab} onChange={setTab} items={[
      {value:'home',label:'Home',icon:'home'},
      {value:'search',label:'Search',icon:'person_search'},
      {value:'alerts',label:'Alerts',icon:'notifications',badge:4},
      {value:'me',label:'Me',icon:'account_circle'}]}/>}
    <Snackbar open={!!snack} message={snack} onDismiss={()=>setSnack(null)}/>
  </PhoneFrame>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
