import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import './Discount.css'
import appsumo from '../../assets/appsumo.svg'

const Discount = () => {
  const { code } = useParams()

  useEffect(() => {
    console.log(code)
  }, [])

  return (
    <>
      <div
        style={{
          backgroundColor: '#fff',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <img
          style={{ width: '300px' }}
          src={appsumo}
          alt='appsumo'
          className='appsumo-logo'
        />
      </div>
    </>
  )
}

export default Discount
