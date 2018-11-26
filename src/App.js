import React from 'react'
import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './containers/login/login'
import Register from './containers/register/register'
import BossInfo from './containers/bossinfo/bossinfo'
import ApplicantInfo from './containers/applicantinfo/applicantinfo'
import Dashboard from './containers/dashboard/dashboard'
import Chat from './components/chat/chat'


import AuthRoute from './components/AuthRoute/AuthRoute'

export default function App() {
  return (
    <div>
      <Router>
        <div>
          <AuthRoute />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/applicantinfo" component={ApplicantInfo} />
            <Route path="/bossinfo" component={BossInfo} />
            <Route path="/chat/:user" component={Chat} />
            <Route component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}
