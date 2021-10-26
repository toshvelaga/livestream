import React from 'react'
import './BroadcastButton.css'

function BroadcastButton(props) {
  return (
    <>
      <button
        style={props.style}
        id={props.id}
        className='broadcast-button'
        onClick={props.fx}
      >
        {props.children}
        {props.title}
      </button>
    </>
  )
}

export default BroadcastButton
