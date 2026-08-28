const { TopAppBar, IconButton, TextField, Chip, Card, Button, Icon, Divider, Switch, Avatar, ListItem } = window.ShakeDesignSystem_bf929b;
const BLOOD=['A+','A−','B+','B−','AB+','AB−','O+','O−'];
function ProfileScreen({onBack,profile,onSave}){
  const[p,setP]=React.useState(profile);
  const set=(k,v)=>setP(s=>({...s,[k]:v}));
  return <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',background:'var(--md-surface)'}}>
    <TopAppBar title="Emergency profile" leadingIcon="arrow_back" onLeading={onBack}/>
    <div style={{flex:1,overflowY:'auto',padding:'4px 16px 24px',display:'flex',flexDirection:'column',gap:18}}>
      <Card variant="filled" style={{display:'flex',gap:12,alignItems:'flex-start'}}>
        <Icon name="visibility" size={20} color="var(--md-on-surface-variant)"/>
        <span style={{font:'var(--type-body-small)',color:'var(--md-on-surface-variant)'}}>
          Everything on this page is broadcast by your beacon and shown to responders who find you. Leave out anything you would not want a stranger to read.</span>
      </Card>
      <div style={{display:'flex',alignItems:'center',gap:14}}>
        <Avatar name={p.name} size={64}/>
        <Button variant="outlined" icon="photo_camera">Add a recent photo</Button>
      </div>
      <TextField label="Full name" value={p.name} onChange={v=>set('name',v)} supporting="As it appears on your ID"/>
      <div style={{display:'flex',gap:12}}>
        <TextField label="Age" value={p.age} onChange={v=>set('age',v)} style={{flex:1}}/>
        <TextField label="Height" value={p.height} onChange={v=>set('height',v)} style={{flex:1}}/>
      </div>
      <div>
        <div style={{font:'var(--type-title-small)',color:'var(--md-on-surface-variant)',margin:'0 4px 10px'}}>Blood type</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
          {BLOOD.map(b=><Chip key={b} type="filter" label={b} selected={p.blood===b} onClick={()=>set('blood',b)}/>)}</div>
      </div>
      <TextField label="Allergies" value={p.allergies} onChange={v=>set('allergies',v)} leadingIcon="allergies" supporting="Medication, food, latex — anything a medic must know"/>
      <TextField label="Conditions" value={p.conditions} onChange={v=>set('conditions',v)} multiline rows={2} supporting="Asthma, diabetes, pacemaker, pregnancy"/>
      <TextField label="Medication you take daily" value={p.meds} onChange={v=>set('meds',v)} multiline rows={2} supporting="Name and dose, if you know it"/>
      <Divider label="Emergency contacts"/>
      <Card variant="outlined" flush>
        <ListItem divider leading={<Avatar name="Hana Kobayashi" size={40}/>} headline="Hana Kobayashi" supporting="Sister · +81 90 9988 7766" trailingIcon="edit"/>
        <ListItem leading={<Avatar name="Ken Ito" size={40}/>} headline="Ken Ito" supporting="Neighbour · +81 90 2233 1100" trailingIcon="edit"/>
      </Card>
      <Button variant="outlined" fullWidth icon="person_add">Add a contact</Button>
      <Card variant="filled">
        <div style={{font:'var(--type-title-medium)',marginBottom:6}}>Who can see this</div>
        <Switch label="Accredited responders" checked onChange={()=>{}}/>
        <Switch label="Anyone who finds my beacon" checked onChange={()=>{}}/>
        <Switch label="Show on my public record" checked={false} onChange={()=>{}}/>
      </Card>
      <Button size="lg" fullWidth icon="save" onClick={()=>onSave(p)}>Save profile</Button>
    </div></div>;
}
Object.assign(window,{ProfileScreen});
