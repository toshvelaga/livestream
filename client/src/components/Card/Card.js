import React from 'react'
import './Card.css'

function Card(props) {
  return (
    <div onClick={props.onClick} className='card-styles'>
      <div className='inner-card-content'>
        {props.children}
        <p style={{ marginTop: 0, paddingTop: 0, fontSize: '20px' }}>
          {props.title}
        </p>
      </div>
    </div>
  )
}

export default React.memo(Card)
