import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  Route, Redirect, Link, Switch } from 'react-router-dom'
import { Button } from 'antd-mobile'

import AddRemoveIcons from './AddRemoveIcons'
import Auth from './Auth'
import { logout } from '../actions'



class A extends Component{
  render() {
    return (
      <h1>A</h1>
    )
  }
}

class B extends Component{
  render() {
    return (
      <h1>B</h1>
    )
  }
}

class Dashboard extends Component{

  render() {
    const match = this.props.match;
    console.log(this.props,"dash");
    const { isAuth, username } = this.props.auth;
    const redirecToLogin = (
      <Redirect to='/login' />
    )
    const dashboard = (
        <div>
          <ul>
            <li>
              <Link to={`${match.url}`}>AddRemoveIcons</Link>
            </li>
            <li>
              <Link to={`${match.url}/a`}>A</Link>
            </li>
            <li>
              <Link to={`${match.url}/b`}>B</Link>
            </li>
            <li>
              <Button type="primary" onClick={this.props.logout}> logout </Button>
            </li>
          </ul>
          <Switch>
            <Route path={`${match.url}`} exact component={AddRemoveIcons}></Route>
            <Route path={`${match.url}/a`} component={A}></Route>
            <Route path={`${match.url}/b`} component={B}></Route>
          </Switch>
        </div>
    )
    return isAuth ? dashboard : redirecToLogin
  }
}

export default connect(
  (state) => ({
    auth: state.auth
  }),
  (dispatch) => ({
    logout: () => dispatch(logout())
  })
)(Dashboard)
