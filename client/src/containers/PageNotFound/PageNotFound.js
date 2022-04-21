import React from 'react'
import './PageNotFound.css'
import NoPageFound404 from '../../assets/404.png'

function PageNotFound() {
  console.log('Page Not Found')
  return (
    <div className='page-not-found-container'>
      <h1>404</h1>
      <h2 className='page-not-found-text'>
        Whoops...sorry friend this page was not found!
      </h2>
    </div>
  )
}

export default PageNotFound
