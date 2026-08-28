import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function ListItem({leading,headline,supporting,overline,trailing,trailingIcon,lines,onClick,selected,divider,style,...rest}){
  const n=lines||(supporting?2:1);const[h,setH]=React.useState(false);
  return <div role={onClick?'button':undefined} onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} {...rest}
    style={{display:'flex',alignItems:n>2?'flex-start':'center',gap:'var(--space-4)',minHeight:n===1?'var(--list-item-1line)':n===2?'var(--list-item-2line)':'var(--list-item-3line)',
      flexShrink:0,padding:'var(--space-2) var(--space-4)',background:selected?'var(--md-secondary-container)':h&&onClick?'var(--layer-hover-on-surface)':'transparent',
      borderBottom:divider?'var(--border-w) solid var(--md-outline-variant)':'none',cursor:onClick?'pointer':'default',transition:'var(--transition-state)',...style}}>
    {leading&&<div style={{display:'flex',alignItems:'center',flex:'0 0 auto'}}>{leading}</div>}
    <div style={{flex:1,minWidth:0,display:'flex',flexDirection:'column',gap:2}}>
      {overline&&<span style={{font:'var(--type-label-small)',letterSpacing:'var(--tracking-label-small)',color:'var(--md-on-surface-variant)',textTransform:'uppercase'}}>{overline}</span>}
      <span style={{font:'var(--type-body-large)',letterSpacing:'var(--tracking-body-large)',color:'var(--md-on-surface)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:n>2?'normal':'nowrap'}}>{headline}</span>
      {supporting&&<span style={{font:'var(--type-body-medium)',letterSpacing:'var(--tracking-body-medium)',color:'var(--md-on-surface-variant)',display:'-webkit-box',WebkitLineClamp:n>2?2:1,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{supporting}</span>}
    </div>
    {trailing&&<div style={{flex:'0 0 auto',display:'flex',alignItems:'center',gap:'var(--space-2)',font:'var(--type-label-small)',letterSpacing:'var(--tracking-label-small)',color:'var(--md-on-surface-variant)'}}>{trailing}</div>}
    {trailingIcon&&<Icon name={trailingIcon} size={24} color="var(--md-on-surface-variant)"/>}
  </div>;
}
