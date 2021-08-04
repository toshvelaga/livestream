import React from 'react'
import './BroadcastButton.css'

function BroadcastButton(props) {
  return (
    <>
      <button
        style={props.style}
        className='broadcast-button'
        onClick={props.fx}
      >
        {props.title}
      </button>
    </>
  )
}

export default BroadcastButton
