import React, { lazy, Suspense, useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './containers/Login/Login'
import Register from './containers/Register/Register'
import Code from './containers/Code/Code'
import getCookie from './utils/getCookie'

const Dashboard = lazy(() => import('./containers/Dashboard/Dashboard'))

function App() {
  const [isLoggedIn, setisLoggedIn] = useState('')
  useEffect(() => {
    let login = getCookie('isLoggedIn')
    setisLoggedIn(login)
  }, [isLoggedIn])

  console.log(isLoggedIn)
  return (
    <>
      <Router>
        {/* A <Switch> looks through its children <Routes> and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/dashboard'>
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          </Route>

          <Route path='/login/code'>
            <Code />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/register/code'>
            <Code />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
