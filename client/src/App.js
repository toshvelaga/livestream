import React, { useEffect, useState, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ReactGA from 'react-ga'
import Login from './containers/Login/Login'
import Register from './containers/Register/Register'
import Code from './containers/Code/Code'
import getCookie from './utils/getCookie'
import PageNotFound from './containers/PageNotFound/PageNotFound'
import Broadcast from './containers/Broadcast/Broadcast'
import ProtectedRoute from './ProtectedRoute'
import AuthRoute from './AuthRoute'
import Destinations from './containers/Destinations/Destinations'
import Referral from './containers/Referral/Referral'
import Studio from './containers/Studio/Studio'
import Settings from './containers/Settings/Settings'
import Billing from './containers/Billing/Billing'
import Confirm from './containers/Billing/Confirm'
import Spinner from './website/Spinner/Spinner'
import Terms from './website/Terms/Terms'
import Privacy from './website/Privacy/Privacy'
const Website = lazy(() => import('./website/Website/Website'))

function App() {
  const [isLoggedIn, setisLoggedIn] = useState('')

  useEffect(() => {
    let login = getCookie('isLoggedIn')
    setisLoggedIn(login)
  }, [isLoggedIn])

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID)
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <>
      <Router>
        <Switch>
          <ProtectedRoute path='/broadcast' component={Broadcast} />
          <ProtectedRoute path='/destinations' component={Destinations} />
          <ProtectedRoute path='/referrals' component={Referral} />
          <ProtectedRoute path='/studio/:id' component={Studio} />
          <ProtectedRoute path='/studio' component={Studio} />
          <ProtectedRoute path='/settings' component={Settings} />
          <ProtectedRoute path='/billing/confirm' component={Confirm} />
          <ProtectedRoute path='/billing' component={Billing} />

          <AuthRoute exact path='/login/code' component={Code} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register/code' component={Code} />
          <AuthRoute exact path='/register' component={Register} />

          {/* LANDING PAGE ROUTES */}
          <Route exact path='/terms' component={Terms} />
          <Route exact path='/privacy-policy' component={Privacy} />
          <Suspense fallback={<Spinner />}>
            <AuthRoute exact path='/' component={Website} />
          </Suspense>
          <Route path='*' component={PageNotFound} />
        </Switch>
      </Router>
    </>
  )
}

export default App
