import React from 'react';
export function Slider({value=50,min=0,max=100,step=1,onChange,label,valueLabel,disabled,style,...rest}){
  const pct=((value-min)/(max-min))*100;
  return <div {...rest} style={{display:'flex',flexDirection:'column',gap:'var(--space-2)',...style}}>
    {(label||valueLabel)&&<div style={{display:'flex',justifyContent:'space-between',font:'var(--type-label-large)',letterSpacing:'var(--tracking-label-large)',color:'var(--md-on-surface-variant)'}}>
      <span>{label}</span><span style={{color:'var(--md-on-surface)'}}>{valueLabel}</span></div>}
    <div style={{position:'relative',height:'var(--touch-target)',display:'flex',alignItems:'center'}}>
      <div style={{position:'absolute',left:0,right:0,height:16,borderRadius:'var(--shape-full)',background:'var(--md-secondary-container)'}}/>
      <div style={{position:'absolute',left:0,width:`calc(${pct}% - 4px)`,height:16,borderRadius:'var(--shape-full)',background:disabled?'color-mix(in srgb,var(--md-on-surface) 38%,transparent)':'var(--md-primary)',transition:'width var(--dur-short-2) var(--ease-standard)'}}/>
      <div style={{position:'absolute',left:`calc(${pct}% - 2px)`,width:4,height:44,borderRadius:'var(--shape-full)',background:disabled?'color-mix(in srgb,var(--md-on-surface) 38%,transparent)':'var(--md-primary)',transition:'left var(--dur-short-2) var(--ease-standard)'}}/>
      <input type="range" value={value} min={min} max={max} step={step} disabled={disabled}
        onChange={e=>onChange&&onChange(Number(e.target.value))}
        style={{position:'absolute',inset:0,width:'100%',opacity:0,cursor:disabled?'default':'pointer',margin:0}}/>
    </div></div>;
}
