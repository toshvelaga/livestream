import React from 'react'
import Button from '../Buttons/Button'
import { useHistory } from 'react-router-dom'

const TrialExpired = (props) => {
  let history = useHistory()

  return (
    <>
      <p>
        Your two week trial has ended. Please upgrade your account to get access
        to all features.
      </p>
      <Button
        id='upgrade-button'
        style={{ width: '100%' }}
        title='Upgrade'
        fx={() => history.push(`/billing`)}
      />
    </>
  )
}

export default TrialExpired
