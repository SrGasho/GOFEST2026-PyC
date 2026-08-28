import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function Chip({label,type='assist',icon,avatar,selected,onRemove,onClick,disabled,style,...rest}){
  const sel=selected&&(type==='filter'||type==='input');
  const[h,setH]=React.useState(false);
  return <button disabled={disabled} onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} {...rest}
    style={{display:'inline-flex',alignItems:'center',gap:8,height:32,padding:onRemove?'0 8px 0 12px':icon||avatar||sel?'0 16px 0 8px':'0 16px',
      background:sel?'var(--md-secondary-container)':type==='suggestion'||type==='filter'?'transparent':'var(--md-surface-container-low)',
      backgroundImage:h&&!disabled?'linear-gradient(var(--layer-hover-on-surface),var(--layer-hover-on-surface))':'none',
      color:sel?'var(--md-on-secondary-container)':'var(--md-on-surface-variant)',
      border:sel?'none':'var(--border-w) solid var(--md-outline-variant)',borderRadius:'var(--shape-chip)',
      font:'var(--type-label-large)',letterSpacing:'var(--tracking-label-large)',cursor:disabled?'default':'pointer',
      opacity:disabled?0.38:1,transition:'var(--transition-state)',whiteSpace:'nowrap',...style}}>
    {sel?<Icon name="check" size={18}/>:avatar?avatar:icon?<Icon name={icon} size={18}/>:null}
    {label}
    {onRemove&&<span onClick={e=>{e.stopPropagation();onRemove()}} style={{display:'grid',placeItems:'center',width:18,height:18}}><Icon name="close" size={18}/></span>}
  </button>;
}
