import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import { Redux } from 'redux';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from './containers/Dashboard'
import Auth from './containers/Auth'

// const mapDispatchToProps = (bindActionCreators, dispatch) => ({
//   actions: bindActionCreators(iconsActions, dispatch)
// })

// @connect(mapDispatchToProps, mapStateToProps)

class App extends Component {
  render(){
    return(
      <div>
        <Router>
          <Switch>
            <Route path='/login' component={Auth}></Route>
            <Route path='/dashboard' component={Dashboard}></Route>
            <Redirect to='/dashboard'></Redirect>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
