import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import getCookie from './utils/getCookie'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = getCookie('isLoggedIn')
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
      }}
    />
  )
}

export default ProtectedRoute
