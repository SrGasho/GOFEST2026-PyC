import React from 'react';
import { Avatar } from './Avatar.jsx';
import { StatusChip } from './StatusChip.jsx';
import { Icon } from '../actions/Icon.jsx';
export function PersonRow({name,status='unconfirmed',lastSeen,distance,updated,onClick,divider=true,style,...rest}){
  const[h,setH]=React.useState(false);
  return <div onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} {...rest}
    style={{display:'flex',alignItems:'center',gap:'var(--space-4)',minHeight:'var(--list-item-3line)',padding:'var(--space-3) var(--space-4)',
      background:h&&onClick?'var(--layer-hover-on-surface)':'transparent',cursor:onClick?'pointer':'default',
      borderBottom:divider?'var(--border-w) solid var(--md-outline-variant)':'none',transition:'var(--transition-state)',...style}}>
    <Avatar name={name} size={48}/>
    <div style={{flex:1,minWidth:0,display:'flex',flexDirection:'column',gap:4}}>
      <div style={{font:'var(--type-body-large)',letterSpacing:'var(--tracking-body-large)',color:'var(--md-on-surface)',fontWeight:500,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{name}</div>
      {lastSeen&&<div style={{display:'flex',alignItems:'center',gap:4,font:'var(--type-body-small)',letterSpacing:'var(--tracking-body-small)',color:'var(--md-on-surface-variant)'}}>
        <Icon name="location_on" size={14}/><span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{lastSeen}</span></div>}
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <StatusChip status={status} size="sm"/>
        {updated&&<span style={{font:'var(--type-label-medium)',letterSpacing:'var(--tracking-label-medium)',color:'var(--md-on-surface-variant)'}}>{updated}</span>}
      </div>
    </div>
    {distance&&<span style={{font:'var(--type-label-medium)',letterSpacing:'var(--tracking-label-medium)',color:'var(--md-on-surface-variant)',flex:'0 0 auto'}}>{distance}</span>}
  </div>;
}
