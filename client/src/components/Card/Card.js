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
        {displayButton && props.selected && (
          <button style={{ padding: '.25rem 1rem', marginTop: '.5rem' }}>
            Remove
          </button>
        )}
        {/* <FaIcons.FaCheckCircle size='20' color='green' /> */}
      </div>
    </div>
  )
}

export default React.memo(Card)
