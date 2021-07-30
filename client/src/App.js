import React, { lazy, Suspense, useEffect, useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Login from './containers/Login/Login'
import Register from './containers/Register/Register'
import Code from './containers/Code/Code'
import getCookie from './utils/getCookie'
import PageNotFound from './containers/PageNotFound/PageNotFound'
import Dashboard from './containers/Dashboard/Dashboard'
import ProtectedRoute from './ProtectedRoute'

// const Dashboard = lazy(() => import('./containers/Dashboard/Dashboard'))

function App() {
  const [isLoggedIn, setisLoggedIn] = useState('')
  useEffect(() => {
    let login = getCookie('isLoggedIn')
    setisLoggedIn(login)
  }, [isLoggedIn])

  return (
    <>
      <Router>
        <Switch>
          <ProtectedRoute path='/dashboard' component={Dashboard} />
          <Route exact path='/login/code' component={Code} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register/code' component={Code} />
          <Route exact path='/register' component={Register} />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </Router>
    </>
  )
}

export default App
