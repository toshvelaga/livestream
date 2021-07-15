import React from 'react'
import './TextInput.css'

function TextInput(props) {
  return (
    <>
      <div className='text-input-container'>
        <label className='label' for='fname'>
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
      </div>
    </>
  )
}

export default TextInput
