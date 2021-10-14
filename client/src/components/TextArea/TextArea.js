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
        maxlength={props.maxlength}
        style={props.style}
        placeholder={props.placeholder}
        id={props.id}
        name='message'
        rows='4'
        cols='30'
        value={props.value}
        onChange={props.onChange}
      ></textarea>
    </div>
  )
}

export default TextArea
