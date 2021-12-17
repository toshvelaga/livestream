import React from 'react'
import './StudioButton.css'

function StudioButton(props) {
  return (
    <>
      <button
        disabled={props.disabled}
        style={props.style}
        id={props.id}
        className='studio-button'
        onClick={props.onClick}
      >
        {props.children}
        {props.title}
      </button>
    </>
  )
}

export default StudioButton
