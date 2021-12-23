import React from 'react'
import SpinnerStyles from './Spinner.module.css'

const Spinner = () => {
  return (
    <div className={SpinnerStyles.spinnerContainer}>
      <div className={SpinnerStyles.spinner}></div>
    </div>
  )
}

export default Spinner
