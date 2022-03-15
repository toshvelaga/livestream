import React from 'react'
import './Input.css'

function Input(props) {
  return (
    <>
      <div className='input-container'>
        <input
          className='webpage-email-input'
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
        <p style={errorStyles}>{props.errorMsg}</p>
      </div>
    </>
  )
}

const errorStyles = {
  color: 'red',
}

export default Input
