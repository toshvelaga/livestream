import React, { useState } from 'react'
import './Card.css'
// import * as FaIcons from 'react-icons/fa'

function Card(props) {
  const [displayButton, setdisplayButton] = useState(false)
  return (
    <div
      id={props.id}
      style={props.style}
      onClick={props.onClick}
      onMouseOver={() => setdisplayButton(true)}
      onMouseLeave={() => setdisplayButton(false)}
      className='card-styles'
    >
      <div className='inner-card-content'>
        {props.children}
        <p style={props.cardTitleStyle} className='card-title'>
          {props.title}
        </p>
        {/* DISPLAY THE REMOVE BUTTON */}
        {displayButton && props.selected && (
          <button onClick={props.onRemoveHandler} className='remove-button'>
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

export default React.memo(Card)
