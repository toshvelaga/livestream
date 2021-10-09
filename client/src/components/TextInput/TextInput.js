import React from 'react'
import './TextInput.css'

function TextInput(props) {
  return (
    <>
      <div className='text-input-container'>
        <label className='label' htmlFor='fname'>
          {props.label}
        </label>
        <input
          type='text'
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          style={
            (props.style, props.errorMsg ? { border: '1px solid red' } : null)
          }
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          maxLength={props.maxLength}
          disabled={props.disabled}
        ></input>
        <span style={errorStyles}>{props.errorMsg}</span>
      </div>
    </>
  )
}

const errorStyles = {
  color: 'red',
}

export default TextInput
