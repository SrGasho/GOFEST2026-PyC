import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function TextField({variant='outlined',label,value='',placeholder,supporting,error,errorText,leadingIcon,trailingIcon,onTrailing,multiline,rows=3,disabled,onChange,style,...rest}){
  const[f2,setF]=React.useState(false);
  const active=f2||!!value||!!placeholder;
  const col=error?'var(--md-error)':f2?'var(--md-primary)':'var(--md-on-surface-variant)';
  const outlined=variant==='outlined';
  const Field=multiline?'textarea':'input';
  return <div {...rest} style={{display:'flex',flexShrink:0,flexDirection:'column',gap:'var(--space-1)',...style}}>
    <div style={{position:'relative',display:'flex',alignItems:multiline?'flex-start':'center',gap:'var(--space-3)',
      minHeight:56,padding:multiline?'var(--space-4)':outlined?'0 var(--space-4)':'var(--space-5) var(--space-4) var(--space-2)',
      background:outlined?'transparent':'var(--md-surface-container-highest)',
      border:outlined?`${f2?'2px':'1px'} solid ${error?'var(--md-error)':f2?'var(--md-primary)':'var(--md-outline)'}`:'none',
      borderBottom:outlined?undefined:`${f2?'2px':'1px'} solid ${col}`,
      borderRadius:outlined?'var(--shape-text-field-outlined)':'var(--shape-text-field)',
      opacity:disabled?0.38:1,transition:'var(--transition-state)'}}>
      {leadingIcon&&<Icon name={leadingIcon} size={24} color={col}/>}
      {label&&<label style={{position:'absolute',left:leadingIcon?52:16,pointerEvents:'none',
        top:active?(outlined?-8:8):'50%',transform:active?'none':'translateY(-50%)',
        padding:outlined&&active?'0 4px':0,background:outlined&&active?'var(--md-surface)':'transparent',
        font:active?'var(--type-body-small)':'var(--type-body-large)',
        letterSpacing:active?'var(--tracking-body-small)':'var(--tracking-body-large)',color:col,
        transition:'all var(--dur-short-3) var(--ease-standard)'}}>{label}</label>}
      <Field value={value} rows={multiline?rows:undefined} placeholder={f2||!label?placeholder:''} disabled={disabled}
        onFocus={()=>setF(true)} onBlur={()=>setF(false)} onChange={e=>onChange&&onChange(e.target.value)}
        style={{flex:1,minWidth:0,border:'none',outline:'none',background:'transparent',resize:'none',
          padding:label&&!multiline?'20px 0 6px':0,color:'var(--md-on-surface)',
          font:'var(--type-body-large)',letterSpacing:'var(--tracking-body-large)',fontFamily:'var(--font-plain)'}}/>
      {trailingIcon&&<span onClick={onTrailing} style={{cursor:onTrailing?'pointer':'default'}}><Icon name={trailingIcon} size={24} color={col}/></span>}
    </div>
    {(supporting||errorText)&&<span style={{padding:'0 var(--space-4)',font:'var(--type-body-small)',letterSpacing:'var(--tracking-body-small)',
      color:error?'var(--md-error)':'var(--md-on-surface-variant)'}}>{error?errorText||supporting:supporting}</span>}
  </div>;
}
