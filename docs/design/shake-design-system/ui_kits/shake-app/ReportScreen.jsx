const { TopAppBar, IconButton, TextField, Button, RadioButton, Checkbox, Divider, Chip, Icon, Card } = window.ShakeDesignSystem_bf929b;
function ReportScreen({onBack,onSubmit}){
  const[name,setName]=React.useState('');
  const[place,setPlace]=React.useState('');
  const[rel,setRel]=React.useState('family');
  const[ok,setOk]=React.useState(false);
  const[err,setErr]=React.useState(false);
  const submit=()=>{if(!name||!ok){setErr(true);return}onSubmit(name)};
  return <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',background:'var(--md-surface)'}}>
    <TopAppBar title="Report someone" leadingIcon="close" onLeading={onBack}/>
    <div style={{flex:1,overflowY:'auto',padding:'4px 16px 24px',display:'flex',flexDirection:'column',gap:16}}>
      <p style={{font:'var(--type-body-medium)',color:'var(--md-on-surface-variant)'}}>Tell us who you are looking for. Anything you know helps — a partial name and an area are enough to start.</p>
      <TextField label="Full name" value={name} onChange={v=>{setName(v);setErr(false)}} error={err&&!name} errorText="A name or nickname is required" supporting="A nickname is fine if that is all you have"/>
      <TextField label="Last seen" value={place} onChange={setPlace} leadingIcon="location_on" trailingIcon="my_location" supporting="Nearest cross street or building"/>
      <TextField label="What they were wearing" value="" multiline rows={2} supporting="Colour and type of clothing"/>
      <Divider label="Your relationship"/>
      <div>
        <RadioButton value="family" checked={rel==='family'} onChange={setRel} label="Family member"/>
        <RadioButton value="friend" checked={rel==='friend'} onChange={setRel} label="Friend or colleague"/>
        <RadioButton value="responder" checked={rel==='responder'} onChange={setRel} label="Responder" supporting="Reports from responders are marked verified"/>
      </div>
      <Card variant="filled" style={{display:'flex',gap:12,alignItems:'flex-start'}}>
        <Icon name="info" size={20} color="var(--md-on-surface-variant)"/>
        <span style={{font:'var(--type-body-small)',color:'var(--md-on-surface-variant)'}}>Reports are visible to anyone searching this event, and to accredited responders. Contact details stay hidden until you allow them.</span>
      </Card>
      <Checkbox label="I confirm this report is accurate" supporting="False reports slow responders down" checked={ok} error={err&&!ok} onChange={v=>{setOk(v);setErr(false)}}/>
      <Button size="lg" fullWidth icon="send" onClick={submit}>Submit report</Button>
    </div></div>;
}
Object.assign(window,{ReportScreen});
