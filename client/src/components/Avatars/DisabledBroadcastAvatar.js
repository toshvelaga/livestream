import React from 'react'
import './DisabledBroadcastAvatar.css'

const DisabledBroadcastAvatar = (props) => {
  return (
    <div
      onClick={props.onClick}
      style={props.style}
      className='disabled-broadcast-avatar'
    >
      {props.children}
    </div>
  )
}

export default DisabledBroadcastAvatar
