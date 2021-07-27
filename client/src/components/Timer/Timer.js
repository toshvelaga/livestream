import React from 'react'
import './Timer.css'

function Timer(props) {
  return <div className='timer-component'>{props.children}</div>
}

export default Timer
