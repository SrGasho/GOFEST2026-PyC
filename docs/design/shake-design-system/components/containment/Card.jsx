import React from 'react';
const V={elevated:{bg:'var(--md-surface-container-low)',bd:'none',el:'var(--elevation-1)',elh:'var(--elevation-2)'},
filled:{bg:'var(--md-surface-container-highest)',bd:'none',el:'var(--elevation-0)',elh:'var(--elevation-1)'},
outlined:{bg:'var(--md-surface)',bd:'var(--border-w) solid var(--md-outline-variant)',el:'var(--elevation-0)',elh:'var(--elevation-1)'}};
export function Card({variant='elevated',interactive,padding='var(--space-4)',flush,children,style,...rest}){
  const v=V[variant]||V.elevated;const[h,setH]=React.useState(false);
  return <div {...rest} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{background:v.bg,border:v.bd,borderRadius:'var(--shape-card)',boxShadow:interactive&&h?v.elh:v.el,flexShrink:0,
      padding:flush?0:padding,overflow:'hidden',cursor:interactive?'pointer':'default',transition:'var(--transition-state)',...style}}>
    {children}</div>;
}
