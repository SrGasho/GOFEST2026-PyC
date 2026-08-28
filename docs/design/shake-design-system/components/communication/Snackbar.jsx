import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function Snackbar({open=true,message,action,onAction,onDismiss,style,...rest}){
  if(!open)return null;
  return <div role="status" {...rest} style={{position:'absolute',left:16,right:16,bottom:96,zIndex:70,
    display:'flex',alignItems:'center',gap:'var(--space-2)',minHeight:48,padding:'var(--space-2) var(--space-2) var(--space-2) var(--space-4)',
    background:'var(--md-inverse-surface)',color:'var(--md-inverse-on-surface)',borderRadius:'var(--shape-snackbar)',
    boxShadow:'var(--elevation-3)',animation:'shake-snack-in var(--dur-medium-2) var(--ease-emphasized-decelerate)',...style}}>
    <span style={{flex:1,font:'var(--type-body-medium)',letterSpacing:'var(--tracking-body-medium)'}}>{message}</span>
    {action&&<button onClick={onAction} style={{background:'none',border:'none',cursor:'pointer',padding:'0 var(--space-2)',height:36,
      color:'var(--md-inverse-primary)',font:'var(--type-label-large)',letterSpacing:'var(--tracking-label-large)'}}>{action}</button>}
    {onDismiss&&<button onClick={onDismiss} aria-label="Dismiss" style={{display:'grid',placeItems:'center',width:36,height:36,background:'none',border:'none',cursor:'pointer',color:'inherit'}}><Icon name="close" size={20}/></button>}
  </div>;
}
