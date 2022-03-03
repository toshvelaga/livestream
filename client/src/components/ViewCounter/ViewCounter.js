import React from 'react'
import './ViewCounter.css'

const ViewCounter = (props) => {
  return <div className='view-counter'>Twitch viewers: {props.num}</div>
}

export default ViewCounter
