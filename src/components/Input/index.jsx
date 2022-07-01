import React from 'react'
import "./Input.scss"
const Input = (props) => {
  const validateInput = props.validateInput
  
  return (
    <div>
        <input type={props.type ? props.type : 'text'} 
          placeholder = {props.placeholder || ""} 
          onChange = {props.onChange}
        
          name = {props.name ? props.name : ''}
         
          />
        {validateInput && console.log(validateInput)}
        {!validateInput && props.message && <span className='input-message'>{props.message}</span>}
    </div>
  )
}

export default Input