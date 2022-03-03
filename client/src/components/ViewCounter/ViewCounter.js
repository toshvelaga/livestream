import React from 'react'
import './ViewCounter.css'

const ViewCounter = (props) => {
  return <div className='view-counter'>Views: {props.num}</div>
}

export default ViewCounter
