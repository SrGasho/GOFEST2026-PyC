import React from 'react';
export function Divider({inset=0,vertical,label,style,...rest}){
  if(label)return <div {...rest} style={{display:'flex',alignItems:'center',gap:'var(--space-3)',margin:'var(--space-3) 0',...style}}>
    <span style={{flex:1,height:1,background:'var(--md-outline-variant)'}}/>
    <span style={{font:'var(--type-label-medium)',letterSpacing:'var(--tracking-label-medium)',color:'var(--md-on-surface-variant)'}}>{label}</span>
    <span style={{flex:1,height:1,background:'var(--md-outline-variant)'}}/></div>;
  return <hr {...rest} style={vertical?{flexShrink:0,width:1,height:'100%',border:0,background:'var(--md-outline-variant)',margin:0,...style}
    :{flexShrink:0,height:1,border:0,background:'var(--md-outline-variant)',margin:0,marginLeft:inset,...style}}/>;
}
