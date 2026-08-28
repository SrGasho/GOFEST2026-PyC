import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function Dialog({open=true,icon,headline,supporting,actions,onDismiss,children,style,...rest}){
  if(!open)return null;
  return <div onClick={onDismiss} style={{position:'absolute',inset:0,zIndex:60,display:'grid',placeItems:'center',padding:'var(--space-6)',
    background:'color-mix(in srgb,var(--md-scrim) 32%,transparent)',animation:'shake-fade var(--dur-medium-1) var(--ease-emphasized-decelerate)'}}>
    <div onClick={e=>e.stopPropagation()} role="dialog" {...rest}
      style={{width:'100%',maxWidth:360,background:'var(--md-surface-container-high)',borderRadius:'var(--shape-dialog)',
        boxShadow:'var(--elevation-3)',padding:'var(--space-6)',display:'flex',flexDirection:'column',gap:'var(--space-4)',
        alignItems:icon?'center':'stretch',textAlign:icon?'center':'left',...style}}>
      {icon&&<Icon name={icon} size={24} color="var(--md-secondary)"/>}
      {headline&&<h2 style={{font:'var(--type-headline-small)',letterSpacing:'var(--tracking-headline-small)',color:'var(--md-on-surface)'}}>{headline}</h2>}
      {supporting&&<p style={{font:'var(--type-body-medium)',letterSpacing:'var(--tracking-body-medium)',color:'var(--md-on-surface-variant)',textAlign:'left'}}>{supporting}</p>}
      {children}
      {actions&&<div style={{display:'flex',justifyContent:'flex-end',gap:'var(--space-2)',marginTop:'var(--space-2)'}}>{actions}</div>}
    </div></div>;
}
