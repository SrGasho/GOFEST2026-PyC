import React from 'react';
export function BottomSheet({open=true,title,onDismiss,height='auto',children,style,...rest}){
  if(!open)return null;
  return <div style={{position:'absolute',inset:0,zIndex:50,display:'flex',alignItems:'flex-end'}}>
    <div onClick={onDismiss} style={{position:'absolute',inset:0,background:'color-mix(in srgb,var(--md-scrim) 32%,transparent)'}}/>
    <div {...rest} style={{position:'relative',width:'100%',maxHeight:'88%',height,background:'var(--md-surface-container-low)',
      borderRadius:'var(--shape-sheet)',boxShadow:'var(--elevation-3)',display:'flex',flexDirection:'column',overflow:'hidden',
      animation:'shake-sheet-in var(--dur-medium-4) var(--ease-emphasized-decelerate)',...style}}>
      <div style={{display:'grid',placeItems:'center',padding:'var(--space-3) 0 var(--space-1)'}}>
        <span style={{width:32,height:4,borderRadius:'var(--shape-full)',background:'color-mix(in srgb,var(--md-on-surface-variant) 40%,transparent)'}}/></div>
      {title&&<h3 style={{font:'var(--type-title-large)',letterSpacing:'var(--tracking-title-large)',padding:'var(--space-2) var(--space-4) var(--space-3)',color:'var(--md-on-surface)'}}>{title}</h3>}
      <div style={{overflowY:'auto',padding:'0 var(--space-4) var(--space-6)'}}>{children}</div>
    </div></div>;
}
