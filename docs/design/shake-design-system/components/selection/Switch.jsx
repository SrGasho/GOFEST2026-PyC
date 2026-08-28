import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function Switch({checked=false,onChange,disabled,icons=true,label,style,...rest}){
  const sw=<button role="switch" aria-checked={checked} disabled={disabled} onClick={()=>onChange&&onChange(!checked)} {...rest}
    style={{position:'relative',width:52,height:32,flex:'0 0 auto',borderRadius:'var(--shape-full)',cursor:disabled?'default':'pointer',
      background:disabled?'color-mix(in srgb,var(--md-on-surface) 12%,transparent)':checked?'var(--md-primary)':'var(--md-surface-container-highest)',
      border:checked?'2px solid transparent':'2px solid var(--md-outline)',padding:0,
      transition:'background-color var(--dur-short-4) var(--ease-standard),border-color var(--dur-short-4) var(--ease-standard)',...style}}>
    <span style={{position:'absolute',top:'50%',left:checked?26:4,transform:'translateY(-50%)',
      width:checked?24:16,height:checked?24:16,borderRadius:'var(--shape-full)',display:'grid',placeItems:'center',
      background:checked?'var(--md-on-primary)':'var(--md-outline)',
      transition:'left var(--dur-short-4) var(--ease-emphasized),width var(--dur-short-2) var(--ease-standard),height var(--dur-short-2) var(--ease-standard)'}}>
      {icons&&checked&&<Icon name="check" size={16} color="var(--md-primary)"/>}
    </span></button>;
  if(!label)return sw;
  return <label style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'var(--space-4)',minHeight:'var(--touch-target)'}}>
    <span style={{font:'var(--type-body-large)',letterSpacing:'var(--tracking-body-large)',color:'var(--md-on-surface)'}}>{label}</span>{sw}</label>;
}
