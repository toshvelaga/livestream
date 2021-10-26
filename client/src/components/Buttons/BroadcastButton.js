import React from 'react'
import './BroadcastButton.css'
import * as FaIcons from 'react-icons/fa'

function BroadcastButton(props) {
  return (
    <>
      <button
        style={props.style}
        id={props.id}
        className='broadcast-button'
        onClick={props.fx}
      >
        {props.title}
      </button>
    </>
  )
}

export default BroadcastButton
