import React from 'react'
import './StudioButton.css'

function StudioButton(props) {
  return (
    <div className='studio-button-container'>
      <button
        disabled={props.disabled}
        style={props.style}
        id={props.id}
        className='studio-button'
        onClick={props.onClick}
      >
        {props.children}
      </button>
      <p className='studio-button-label'>{props.label}</p>
    </div>
  )
}

export default StudioButton
