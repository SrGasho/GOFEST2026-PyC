import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function NavigationBar({items=[],value,onChange,style,...rest}){
  return <nav {...rest} style={{display:'flex',flexShrink:0,height:'var(--nav-bar-h)',background:'var(--md-surface-container)',
    padding:'var(--space-3) var(--space-2) var(--space-4)',...style}}>
    {items.map(it=>{const on=it.value===value;return(
      <button key={it.value} onClick={()=>onChange&&onChange(it.value)}
        style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4,background:'none',border:'none',cursor:'pointer',padding:0}}>
        <span style={{position:'relative',display:'grid',placeItems:'center',width:64,height:32,borderRadius:'var(--shape-full)',
          background:on?'var(--md-secondary-container)':'transparent',transition:'background-color var(--dur-short-4) var(--ease-standard)'}}>
          <Icon name={it.icon} size={24} fill={on} color={on?'var(--md-on-secondary-container)':'var(--md-on-surface-variant)'}/>
          {it.badge?<span style={{position:'absolute',top:2,right:14,minWidth:16,height:16,padding:'0 4px',borderRadius:'var(--shape-full)',
            background:'var(--md-error)',color:'var(--md-on-error)',font:'var(--type-label-small)',display:'grid',placeItems:'center'}}>{it.badge}</span>:null}
        </span>
        <span style={{font:'var(--type-label-medium)',letterSpacing:'var(--tracking-label-medium)',
          color:on?'var(--md-on-surface)':'var(--md-on-surface-variant)',fontWeight:on?700:500}}>{it.label}</span>
      </button>);})}
  </nav>;
}
