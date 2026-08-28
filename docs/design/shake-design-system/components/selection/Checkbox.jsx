import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function Checkbox({checked=false,indeterminate,onChange,disabled,label,supporting,error,style,...rest}){
  const on=checked||indeterminate;
  const box=<span style={{display:'grid',placeItems:'center',width:18,height:18,flex:'0 0 auto',borderRadius:2,
    background:on?(error?'var(--md-error)':'var(--md-primary)'):'transparent',
    border:on?'none':`2px solid ${error?'var(--md-error)':'var(--md-on-surface-variant)'}`,
    opacity:disabled?0.38:1,transition:'var(--transition-state)'}}>
    {on&&<Icon name={indeterminate?'remove':'check'} size={16} color="var(--md-on-primary)"/>}</span>;
  return <label {...rest} style={{display:'flex',alignItems:supporting?'flex-start':'center',gap:'var(--space-3)',minHeight:'var(--touch-target)',
    cursor:disabled?'default':'pointer',...style}} onClick={()=>!disabled&&onChange&&onChange(!checked)}>
    <span style={{display:'grid',placeItems:'center',width:40,height:40,flex:'0 0 auto',marginLeft:-8}}>{box}</span>
    {label&&<span style={{display:'flex',flexDirection:'column',gap:2,paddingTop:supporting?10:0}}>
      <span style={{font:'var(--type-body-large)',letterSpacing:'var(--tracking-body-large)',color:disabled?'color-mix(in srgb,var(--md-on-surface) 38%,transparent)':'var(--md-on-surface)'}}>{label}</span>
      {supporting&&<span style={{font:'var(--type-body-small)',letterSpacing:'var(--tracking-body-small)',color:'var(--md-on-surface-variant)'}}>{supporting}</span>}
    </span>}
  </label>;
}
