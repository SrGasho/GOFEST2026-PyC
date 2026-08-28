import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function Tabs({items=[],value,onChange,variant='primary',style,...rest}){
  return <div role="tablist" {...rest} style={{display:'flex',flexShrink:0,borderBottom:'var(--border-w) solid var(--md-outline-variant)',background:'var(--md-surface)',...style}}>
    {items.map(it=>{const on=it.value===value;const col=on?(variant==='primary'?'var(--md-primary)':'var(--md-on-surface)'):'var(--md-on-surface-variant)';
      return <button key={it.value} role="tab" onClick={()=>onChange&&onChange(it.value)}
        style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2,height:variant==='primary'&&it.icon?64:48,
          background:'none',border:'none',cursor:'pointer',color:col,position:'relative',padding:'0 var(--space-4)'}}>
        {it.icon&&<Icon name={it.icon} size={24} fill={on}/>}
        <span style={{font:'var(--type-title-small)',letterSpacing:'var(--tracking-title-small)',whiteSpace:'nowrap'}}>{it.label}</span>
        {on&&<span style={{position:'absolute',left:variant==='primary'?'50%':0,transform:variant==='primary'?'translateX(-50%)':'none',
          bottom:0,width:variant==='primary'?56:'100%',height:3,borderRadius:'3px 3px 0 0',background:'var(--md-primary)'}}/>}
      </button>;})}
  </div>;
}
