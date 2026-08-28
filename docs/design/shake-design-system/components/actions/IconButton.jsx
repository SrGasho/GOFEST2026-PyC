import React from 'react';
import { Icon } from './Icon.jsx';
const V={standard:['transparent','var(--md-on-surface-variant)'],filled:['var(--md-primary)','var(--md-on-primary)'],tonal:['var(--md-secondary-container)','var(--md-on-secondary-container)'],outlined:['transparent','var(--md-on-surface-variant)']};
export function IconButton({icon='more_vert',label,variant='standard',selected,size=24,disabled,style,...rest}){
  const[bg,fg]=selected&&variant==='standard'?['var(--md-primary-container)','var(--md-on-primary-container)']:(V[variant]||V.standard);
  const[h,setH]=React.useState(false);
  return <button aria-label={label} title={label} disabled={disabled} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} {...rest}
    style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:40,height:40,flex:'0 0 auto',
      background:bg,backgroundImage:h&&!disabled?`linear-gradient(color-mix(in srgb,${fg} 8%,transparent),color-mix(in srgb,${fg} 8%,transparent))`:'none',
      color:disabled?'color-mix(in srgb,var(--md-on-surface) 38%,transparent)':fg,
      border:variant==='outlined'?'var(--border-w) solid var(--md-outline)':'none',borderRadius:'var(--shape-full)',
      cursor:disabled?'default':'pointer',transition:'var(--transition-state)',...style}}>
    <Icon name={icon} size={size} fill={selected}/>
  </button>;
}
