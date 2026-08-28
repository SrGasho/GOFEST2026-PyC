import React from 'react';
export function Icon({name='help',size=24,fill=0,weight=400,grade=0,color,style,...rest}){
  return <span className="shake-icon" aria-hidden="true" {...rest}
    style={{fontSize:size,width:size,height:size,color,
      fontVariationSettings:`'FILL' ${fill?1:0},'wght' ${weight},'GRAD' ${grade},'opsz' ${size}`,...style}}>{name}</span>;
}
