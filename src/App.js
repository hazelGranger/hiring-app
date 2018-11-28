import React, { Component } from 'react'
import './App.css'

import { Switch, Route } from 'react-router-dom'

import Login from './containers/login/login'
import Register from './containers/register/register'
import BossInfo from './containers/bossinfo/bossinfo'
import ApplicantInfo from './containers/applicantinfo/applicantinfo'
import Dashboard from './containers/dashboard/dashboard'
import Chat from './components/chat/chat'


import AuthRoute from './components/AuthRoute/AuthRoute'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(){
    this.setState({
      hasError: true
    })
  }

  render(){
    return (
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
    )
  }
}

export default App
