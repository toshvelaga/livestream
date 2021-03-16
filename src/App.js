import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";

const Dashboard = lazy(() => import("./containers/Dashboard/Dashboard"));

function App() {
  return (
    <>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/dashboard">
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          </Route>

          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
