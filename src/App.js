import React, { Component } from 'react';
import './App.css';


import { Redux } from 'redux';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Login from './containers/login/login.js'
import Register from './containers/register/register.js'
import Boss from './containers/boss/boss.js'

import AuthRoute from './components/AuthRoute/AuthRoute.js'

class App extends Component {
  render(){
    return(
      <div>
        <Router>
          <div>
            <AuthRoute></AuthRoute>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
            <Route path='/boss' component={Boss}></Route>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
