import React from 'react';
import { IconButton } from '../actions/IconButton.jsx';
export function TopAppBar({title,subtitle,variant='small',leadingIcon,onLeading,actions,scrolled,style,...rest}){
  const large=variant==='large'||variant==='medium';
  return <header {...rest} style={{display:'flex',flexShrink:0,flexDirection:large?'column':'row',alignItems:large?'stretch':'center',gap:large?0:'var(--space-1)',
    minHeight:large?(variant==='large'?152:112):'var(--top-app-bar-h)',padding:large?0:'0 var(--space-1)',
    background:scrolled?'var(--md-surface-container)':'var(--md-surface)',transition:'background-color var(--dur-short-4) var(--ease-standard)',...style}}>
    <div style={{display:'flex',flex:large?'0 0 auto':1,width:'100%',alignItems:'center',gap:'var(--space-1)',height:'var(--top-app-bar-h)',padding:large?'0 var(--space-1)':0}}>
      {leadingIcon&&<IconButton icon={leadingIcon} label="Back" onClick={onLeading}/>}
      {!large&&<div style={{flex:1,minWidth:0,paddingLeft:leadingIcon?0:'var(--space-3)'}}>
        <div style={{font:'var(--type-title-large)',letterSpacing:'var(--tracking-title-large)',color:'var(--md-on-surface)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{title}</div>
        {subtitle&&<div style={{font:'var(--type-body-small)',letterSpacing:'var(--tracking-body-small)',color:'var(--md-on-surface-variant)'}}>{subtitle}</div>}
      </div>}
      {large&&<div style={{flex:1}}/>}
      <div style={{display:'flex',alignItems:'center',gap:'var(--space-1)'}}>{actions}</div>
    </div>
    {large&&<div style={{padding:'0 var(--space-4) var(--space-6)'}}>
      <h1 style={{font:variant==='large'?'var(--type-headline-medium)':'var(--type-headline-small)',letterSpacing:'0px',color:'var(--md-on-surface)'}}>{title}</h1>
      {subtitle&&<p style={{marginTop:4,font:'var(--type-body-medium)',letterSpacing:'var(--tracking-body-medium)',color:'var(--md-on-surface-variant)'}}>{subtitle}</p>}
    </div>}
  </header>;
}
