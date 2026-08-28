import React from 'react';
import { Icon } from './Icon.jsx';
export function SegmentedButton({options=[],value,onChange,fullWidth=true,style,...rest}){
  return <div role="group" {...rest} style={{display:'inline-flex',flexShrink:0,width:fullWidth?'100%':'auto',height:40,border:'var(--border-w) solid var(--md-outline)',borderRadius:'var(--shape-full)',overflow:'hidden',...style}}>
    {options.map((o,i)=>{const on=o.value===value;return(
      <button key={o.value} onClick={()=>onChange&&onChange(o.value)}
        style={{flex:1,display:'inline-flex',alignItems:'center',justifyContent:'center',gap:8,padding:'0 12px',
          background:on?'var(--md-secondary-container)':'transparent',color:on?'var(--md-on-secondary-container)':'var(--md-on-surface)',
          border:'none',borderLeft:i?'var(--border-w) solid var(--md-outline)':'none',
          font:'var(--type-label-large)',letterSpacing:'var(--tracking-label-large)',cursor:'pointer',transition:'var(--transition-state)'}}>
        {on&&<Icon name="check" size={18}/>}{o.label}
      </button>);})}
  </div>;
}
