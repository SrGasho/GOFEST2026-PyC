import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function SearchBar({value='',placeholder='Search',onChange,onSubmit,leading='search',trailing,style,...rest}){
  const[f2,setF]=React.useState(false);
  return <div {...rest} style={{display:'flex',alignItems:'center',gap:'var(--space-3)',height:56,padding:'0 var(--space-4)',
    background:'var(--md-surface-container-high)',borderRadius:'var(--shape-full)',
    boxShadow:f2?'var(--elevation-1)':'none',transition:'var(--transition-state)',...style}}>
    <Icon name={leading} size={24} color="var(--md-on-surface-variant)"/>
    <input value={value} placeholder={placeholder} onFocus={()=>setF(true)} onBlur={()=>setF(false)}
      onChange={e=>onChange&&onChange(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&onSubmit)onSubmit(value)}}
      style={{flex:1,minWidth:0,border:'none',outline:'none',background:'transparent',color:'var(--md-on-surface)',
        font:'var(--type-body-large)',letterSpacing:'var(--tracking-body-large)'}}/>
    {trailing}
  </div>;
}
