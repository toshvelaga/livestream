import React from 'react'
import './BroadcastAvatar.css'

const BroadcastAvatar = (props) => {
  return (
    <div onClick={props.onClick} className='broadcast-avatar'>
      {props.children}
    </div>
  )
}

export default BroadcastAvatar
