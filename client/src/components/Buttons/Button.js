import React from 'react'
import './Button.css'

function Button(props) {
  return (
    <>
      <button style={props.style} className='button' onClick={props.fx}>
        {props.loading ? <div class='loader'></div> : null}
        {props.title}
      </button>
    </>
  )
}

export default Button
