import React from 'react';
export function Badge({count,dot,max=99,color='error',style,...rest}){
  const c=color==='error'?['var(--md-error)','var(--md-on-error)']:color==='primary'?['var(--md-primary)','var(--md-on-primary)']:['var(--md-tertiary)','var(--md-on-tertiary)'];
  if(dot)return <span {...rest} style={{width:6,height:6,borderRadius:'var(--shape-full)',background:c[0],display:'inline-block',...style}}/>;
  const t=typeof count==='number'&&count>max?`${max}+`:count;
  return <span {...rest} style={{display:'inline-grid',placeItems:'center',minWidth:16,height:16,padding:'0 4px',
    borderRadius:'var(--shape-full)',background:c[0],color:c[1],font:'var(--type-label-small)',letterSpacing:'var(--tracking-label-small)',...style}}>{t}</span>;
}
