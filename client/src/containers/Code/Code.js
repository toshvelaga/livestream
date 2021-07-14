import React, { useState } from 'react'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import './Code.css'

function Code() {
  const [code, setCode] = useState('')
  return (
    <>
      <div className='code-container'>
        <TextInput
          label='Code'
          placeholder='Enter 6 digit code'
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          fx={() => alert('clicked')}
          style={{ width: '100%' }}
          title='Log In'
        />
      </div>
    </>
  )
}

export default Code
