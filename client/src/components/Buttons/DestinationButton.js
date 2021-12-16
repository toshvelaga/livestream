import React from 'react'
import './DestinationButton.css'

function DestinationButton(props) {
  return (
    <>
      <button
        disabled={props.disabled}
        style={props.style}
        id={props.id}
        className='destination-button'
        onClick={props.fx}
      >
        {props.children}
        {props.title}
      </button>
    </>
  )
}

export default DestinationButton
