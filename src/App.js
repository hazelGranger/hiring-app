import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './containers/login/login.js'
import Register from './containers/register/register.js'
import BossInfo from './containers/bossinfo/bossinfo.js'
import ApplicantInfo from './containers/applicantinfo/applicantinfo.js'
import Dashboard from './containers/dashboard/dashboard.js'

import AuthRoute from './components/AuthRoute/AuthRoute.js'

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
              <Route component={Dashboard}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
