import React from 'react';
import { Icon } from './Icon.jsx';
const C={primary:['var(--md-primary-container)','var(--md-on-primary-container)'],surface:['var(--md-surface-container-high)','var(--md-primary)'],secondary:['var(--md-secondary-container)','var(--md-on-secondary-container)'],tertiary:['var(--md-tertiary-container)','var(--md-on-tertiary-container)'],emergency:['var(--md-error)','var(--md-on-error)']};
export function FAB({icon='add',label,size='md',color='primary',style,...rest}){
  const[bg,fg]=C[color]||C.primary;const[h,setH]=React.useState(false);
  const d=size==='small'?40:size==='large'?96:56;
  const ext=!!label;
  return <button {...rest} style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:12,
    height:d,width:ext?'auto':d,minWidth:ext?80:d,padding:ext?'0 20px':0,background:bg,color:fg,border:'none',
    borderRadius:size==='small'?'var(--shape-md)':size==='large'?'var(--shape-fab-large)':'var(--shape-fab)',
    boxShadow:h?'var(--elevation-4)':'var(--elevation-3)',cursor:'pointer',transition:'var(--transition-state)',
    font:'var(--type-label-large)',letterSpacing:'var(--tracking-label-large)'}}
    onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>
    <Icon name={icon} size={size==='large'?36:24}/>{label}
  </button>;
}
