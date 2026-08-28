import React from 'react';
import { Icon } from '../actions/Icon.jsx';
const MODE={
  sos:{on:'var(--md-error)',fg:'var(--md-on-error)',soft:'var(--md-error-container)',softFg:'var(--md-on-error-container)',icon:'sos',title:'SOS beacon',sub:'I need help where I am'},
  search:{on:'var(--md-primary)',fg:'var(--md-on-primary)',soft:'var(--md-primary-container)',softFg:'var(--md-on-primary-container)',icon:'radar',title:'Search beacon',sub:'I am looking for someone'}
};
export function BeaconControl({mode='sos',active,disabled,onActivate,onStop,size=200,style,...rest}){
  const m=MODE[mode]||MODE.sos;
  return <div {...rest} style={{display:'flex',flexShrink:0,flexDirection:'column',alignItems:'center',gap:'var(--space-4)',...style}}>
    <button disabled={disabled} onClick={()=>active?onStop&&onStop():onActivate&&onActivate()}
      style={{position:'relative',flexShrink:0,width:size,height:size,borderRadius:'var(--shape-full)',border:'none',padding:0,
        background:disabled?'color-mix(in srgb,var(--md-on-surface) 12%,transparent)':active?m.on:m.soft,
        color:disabled?'color-mix(in srgb,var(--md-on-surface) 38%,transparent)':active?m.fg:m.softFg,
        boxShadow:active?'var(--elevation-4)':'var(--elevation-1)',cursor:disabled?'default':'pointer',
        transition:'background-color var(--dur-medium-2) var(--ease-emphasized),box-shadow var(--dur-medium-2) var(--ease-emphasized)'}}>
      {active&&[0,1,2].map(i=><span key={i} style={{position:'absolute',inset:-2,borderRadius:'var(--shape-full)',
        border:`2px solid ${m.on}`,animation:`shake-ripple 2.4s var(--ease-standard) ${i*0.8}s infinite`,pointerEvents:'none'}}/>)}
      <span style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
        <Icon name={m.icon} size={Math.round(size*0.3)} fill={active}/>
        <span style={{font:'var(--type-title-medium)',letterSpacing:'var(--tracking-title-medium)'}}>{active?'Broadcasting':'Hold to start'}</span>
      </span></button>
    <div style={{textAlign:'center'}}>
      <div style={{font:'var(--type-title-large)',letterSpacing:'var(--tracking-title-large)',color:'var(--md-on-surface)'}}>{m.title}</div>
      <div style={{font:'var(--type-body-medium)',letterSpacing:'var(--tracking-body-medium)',color:'var(--md-on-surface-variant)',marginTop:2}}>{m.sub}</div>
    </div></div>;
}
