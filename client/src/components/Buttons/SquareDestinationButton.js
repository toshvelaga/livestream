import React from 'react'
import './SquareDestinationButton.css'

const SquareDestinationButton = (props) => {
  return <button className='square-button-container'>{props.children}</button>
}

export default SquareDestinationButton
