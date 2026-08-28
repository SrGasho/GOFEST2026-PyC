import React from 'react';
import { Icon } from '../actions/Icon.jsx';
const RING={safe:'var(--status-safe)',missing:'var(--status-missing)',unconfirmed:'var(--status-unconfirmed)',injured:'var(--status-injured)',none:'transparent'};
export function Avatar({name,src,size=40,status='none',icon,style,...rest}){
  const init=(name||'').split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
  const ring=RING[status]||'transparent';
  return <span {...rest} style={{position:'relative',display:'inline-grid',placeItems:'center',width:size,height:size,flex:'0 0 auto',
    borderRadius:'var(--shape-full)',background:src?'var(--md-surface-container-highest)':'var(--md-secondary-container)',
    color:'var(--md-on-secondary-container)',font:`500 ${Math.round(size*0.36)}px/1 var(--font-plain)`,
    boxShadow:status!=='none'?`0 0 0 2px var(--md-surface),0 0 0 4px ${ring}`:'none',overflow:'visible',...style}}>
    {src?<img src={src} alt={name||''} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'var(--shape-full)'}}/>
      :icon?<Icon name={icon} size={Math.round(size*0.55)}/>:init||<Icon name="person" size={Math.round(size*0.55)}/>}
  </span>;
}
