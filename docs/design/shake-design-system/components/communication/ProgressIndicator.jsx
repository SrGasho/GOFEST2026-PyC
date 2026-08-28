import React from 'react';
export function ProgressIndicator({variant='linear',value,size=48,thickness=4,style,...rest}){
  const ind=value==null;
  if(variant==='circular')return <span {...rest} style={{display:'inline-block',width:size,height:size,
    borderRadius:'var(--shape-full)',border:`${thickness}px solid var(--md-secondary-container)`,borderTopColor:'var(--md-primary)',
    animation:ind?'shake-spin 1.1s linear infinite':'none',transform:ind?'none':`rotate(${(value/100)*360}deg)`,...style}}/>;
  return <span {...rest} style={{position:'relative',display:'block',height:thickness,borderRadius:'var(--shape-full)',
    background:'var(--md-secondary-container)',overflow:'hidden',...style}}>
    <span style={{position:'absolute',inset:0,width:ind?'40%':`${value}%`,borderRadius:'var(--shape-full)',background:'var(--md-primary)',
      animation:ind?'shake-indeterminate 1.6s var(--ease-standard) infinite':'none',
      transition:'width var(--dur-medium-2) var(--ease-standard)'}}/></span>;
}
