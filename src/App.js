import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './containers/login/login'
import Register from './containers/register/register'
import BossInfo from './containers/bossinfo/bossinfo'
import ApplicantInfo from './containers/applicantinfo/applicantinfo'
import Dashboard from './containers/dashboard/dashboard'
import Chat from './components/chat/chat'


import AuthRoute from './components/AuthRoute/AuthRoute'

class App extends Component {
  render(){
    return(
      <div>
        <Router>
          <div>
            <AuthRoute></AuthRoute>
            <Switch>
              <Route path='/login' component={Login}></Route>
              <Route path='/register' component={Register}></Route>
              <Route path="/applicantinfo" component={ApplicantInfo}></Route>
              <Route path="/bossinfo" component={BossInfo}></Route>
              <Route path="/chat/:user" component={Chat}></Route>
              <Route component={Dashboard}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
