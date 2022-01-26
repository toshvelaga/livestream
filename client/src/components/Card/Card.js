import React from 'react'
import './Card.css'
// import * as FaIcons from 'react-icons/fa'

function Card(props) {
  return (
    <div
      id={props.id}
      style={props.style}
      onClick={props.onClick}
      className='card-styles'
    >
      <div className='inner-card-content'>
        {props.children}
        <p style={props.cardTitleStyle} className='card-title'>
          {props.title}
        </p>
        {/* <FaIcons.FaCheckCircle size='20' color='green' /> */}
      </div>
    </div>
  )
}

export default React.memo(Card)
