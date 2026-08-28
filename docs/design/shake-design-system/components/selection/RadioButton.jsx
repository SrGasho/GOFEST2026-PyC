import React from 'react';
export function RadioButton({checked=false,onChange,disabled,label,supporting,value,style,...rest}){
  return <label {...rest} onClick={()=>!disabled&&onChange&&onChange(value)}
    style={{display:'flex',alignItems:supporting?'flex-start':'center',gap:'var(--space-3)',minHeight:'var(--touch-target)',cursor:disabled?'default':'pointer',...style}}>
    <span style={{display:'grid',placeItems:'center',width:40,height:40,flex:'0 0 auto',marginLeft:-8}}>
      <span style={{display:'grid',placeItems:'center',width:20,height:20,borderRadius:'var(--shape-full)',
        border:`2px solid ${checked?'var(--md-primary)':'var(--md-on-surface-variant)'}`,opacity:disabled?0.38:1,transition:'var(--transition-state)'}}>
        {checked&&<span style={{width:10,height:10,borderRadius:'var(--shape-full)',background:'var(--md-primary)'}}/>}
      </span></span>
    {label&&<span style={{display:'flex',flexDirection:'column',gap:2,paddingTop:supporting?9:0}}>
      <span style={{font:'var(--type-body-large)',letterSpacing:'var(--tracking-body-large)',color:'var(--md-on-surface)'}}>{label}</span>
      {supporting&&<span style={{font:'var(--type-body-small)',letterSpacing:'var(--tracking-body-small)',color:'var(--md-on-surface-variant)'}}>{supporting}</span>}
    </span>}
  </label>;
}
