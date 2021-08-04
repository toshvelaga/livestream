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
          style={props.style}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          maxLength={props.maxLength}
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
