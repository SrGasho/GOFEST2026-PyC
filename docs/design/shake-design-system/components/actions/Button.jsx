import React from 'react';
import { Icon } from './Icon.jsx';
const V={
  filled:{bg:'var(--md-primary)',fg:'var(--md-on-primary)',bd:'none',el:'var(--elevation-0)',elh:'var(--elevation-1)'},
  tonal:{bg:'var(--md-secondary-container)',fg:'var(--md-on-secondary-container)',bd:'none',el:'var(--elevation-0)',elh:'var(--elevation-1)'},
  elevated:{bg:'var(--md-surface-container-low)',fg:'var(--md-primary)',bd:'none',el:'var(--elevation-1)',elh:'var(--elevation-2)'},
  outlined:{bg:'transparent',fg:'var(--md-primary)',bd:'var(--border-w) solid var(--md-outline)',el:'var(--elevation-0)',elh:'var(--elevation-0)'},
  text:{bg:'transparent',fg:'var(--md-primary)',bd:'none',el:'var(--elevation-0)',elh:'var(--elevation-0)'},
  danger:{bg:'var(--md-error)',fg:'var(--md-on-error)',bd:'none',el:'var(--elevation-0)',elh:'var(--elevation-1)'}
};
const H={xs:32,sm:40,md:40,lg:56};
export function Button({variant='filled',size='md',icon,trailingIcon,fullWidth,disabled,loading,children,style,...rest}){
  const v=V[variant]||V.filled;const[h,setH]=React.useState(false),[p,setP]=React.useState(false);
  const off=disabled||loading;const tall=size==='lg';
  const layer=off?'transparent':p?`color-mix(in srgb,${v.fg} 10%,transparent)`:h?`color-mix(in srgb,${v.fg} 8%,transparent)`:'transparent';
  return <button disabled={off} onMouseEnter={()=>setH(true)} onMouseLeave={()=>{setH(false);setP(false)}} onMouseDown={()=>setP(true)} onMouseUp={()=>setP(false)} {...rest}
    style={{position:'relative',display:'inline-flex',flexShrink:0,alignItems:'center',justifyContent:'center',gap:8,
      height:H[size],padding:variant==='text'?'0 12px':tall?'0 32px':icon?'0 24px 0 16px':'0 24px',width:fullWidth?'100%':'auto',
      background:off?'color-mix(in srgb,var(--md-on-surface) 12%,transparent)':v.bg,
      color:off?'color-mix(in srgb,var(--md-on-surface) 38%,transparent)':v.fg,
      border:off?'none':v.bd,borderRadius:'var(--shape-button)',
      font:tall?'var(--type-title-medium)':'var(--type-label-large)',letterSpacing:'var(--tracking-label-large)',
      boxShadow:off?'none':h?v.elh:v.el,cursor:off?'default':'pointer',
      transition:'var(--transition-state)',backgroundImage:`linear-gradient(${layer},${layer})`,...style}}>
    {loading?<Icon name="progress_activity" size={18} style={{animation:'shake-spin 1s linear infinite'}}/>:icon?<Icon name={icon} size={18}/>:null}
    {children}
    {trailingIcon&&<Icon name={trailingIcon} size={18}/>}
  </button>;
}
