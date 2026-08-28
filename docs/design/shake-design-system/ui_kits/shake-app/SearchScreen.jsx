const { TopAppBar, SearchBar, IconButton, Tabs, PersonRow, ListItem, Icon, Chip, Divider, SegmentedButton, Avatar } = window.ShakeDesignSystem_bf929b;
function SearchScreen({data,onOpen}){
  const[q,setQ]=React.useState('');
  const[tab,setTab]=React.useState('people');
  const[seg,setSeg]=React.useState('all');
  const people=data.people.filter(p=>(seg==='all'||p.status===seg)&&p.name.toLowerCase().includes(q.toLowerCase()));
  return <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',background:'var(--md-surface)'}}>
    <div style={{padding:'12px 16px 8px'}}>
      <SearchBar value={q} onChange={setQ} placeholder="Name, phone or last-seen area" trailing={<IconButton icon="mic" label="Voice search"/>}/>
    </div>
    <Tabs value={tab} onChange={setTab} items={[{value:'people',label:'People'},{value:'shelters',label:'Shelters'}]}/>
    {tab==='people'?<div style={{flex:1,overflowY:'auto'}}>
      <div style={{padding:'12px 16px'}}><SegmentedButton value={seg} onChange={setSeg} options={[{value:'all',label:'All'},{value:'missing',label:'Missing'},{value:'safe',label:'Safe'}]}/></div>
      <div style={{padding:'0 16px 4px',font:'var(--type-label-medium)',letterSpacing:'var(--tracking-label-medium)',color:'var(--md-on-surface-variant)'}}>{people.length} RECORDS · SORTED BY DISTANCE</div>
      {people.map((p,i)=><PersonRow key={p.id} {...p} divider={i<people.length-1} onClick={()=>onOpen(p.id)}/>)}
      {!people.length&&<div style={{padding:'48px 24px',textAlign:'center',color:'var(--md-on-surface-variant)'}}>
        <Icon name="person_search" size={40}/><p style={{marginTop:8,font:'var(--type-body-medium)'}}>No records match “{q}”.</p></div>}
    </div>:<div style={{flex:1,overflowY:'auto'}}>
      {data.shelters.map((s,i)=><ListItem key={s.id} divider={i<data.shelters.length-1}
        leading={<Avatar icon="home_work" size={40}/>} headline={s.name}
        supporting={s.open?`Open · ${s.capacity}`:'At capacity'}
        trailing={<span>{s.distance}</span>} trailingIcon="chevron_right"/>)}
    </div>}
  </div>;
}
Object.assign(window,{SearchScreen});
