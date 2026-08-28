import React from 'react';
import { Icon } from '../actions/Icon.jsx';
const LV=['var(--seismic-1)','var(--seismic-2)','var(--seismic-3)','var(--seismic-4)','var(--seismic-5)','var(--seismic-6)','var(--seismic-7)'];
export function SeismicBar({level=4,place,time,magnitude,style,...rest}){
  return <div {...rest} style={{display:'flex',alignItems:'center',gap:'var(--space-3)',padding:'var(--space-3) var(--space-4)',
    background:'var(--md-error-container)',color:'var(--md-on-error-container)',...style}}>
    <Icon name="crisis_alert" size={24} fill style={{animation:'shake-pulse 2s var(--ease-standard) infinite'}}/>
    <div style={{flex:1,minWidth:0}}>
      <div style={{font:'var(--type-title-small)',letterSpacing:'var(--tracking-title-small)'}}>M{magnitude} · {place}</div>
      <div style={{font:'var(--type-body-small)',letterSpacing:'var(--tracking-body-small)',opacity:.8}}>{time}</div>
    </div>
    <div style={{display:'flex',gap:2,alignItems:'flex-end',height:24}}>
      {LV.map((c,i)=><span key={i} style={{width:5,height:8+i*2.6,borderRadius:1,background:i<level?c:'color-mix(in srgb,currentColor 18%,transparent)'}}/>)}
    </div></div>;
}
