import React from 'react'
import './TextArea.css'

const TextArea = (props) => {
  return (
    <div>
      <label className='label' htmlFor='fname'>
        {props.label}
      </label>
      <textarea
        className='textarea'
        maxLength={props.maxLength}
        style={props.style}
        placeholder={props.placeholder}
        id={props.id}
        name='message'
        rows='4'
        cols='30'
        value={props.value}
        onChange={props.onChange}
      ></textarea>
      <span style={errorStyles}>{props.errorMsg}</span>
    </div>
  )
}

const errorStyles = {
  color: 'red',
}

export default TextArea
