import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

import { login } from '../actions'

class Auth extends Component{

  render(){
    console.log(this.props,"AUth");
    const redirecToDashboard = <Redirect to="dashboard" />;
    const login = (
      <div>
        { this.props.isAuth ? "asd" : null }
        <p>You need login to experience the whole app</p>
        <Button type="primary" onClick={this.props.login}>login</Button>
      </div>
    )
    return this.props.auth.isAuth ? redirecToDashboard : login
  }
}

export default connect(
  (state) => ({
    auth: state.auth
  }),
  (dispatch) =>({
    login: () => dispatch(login())
  })
)(Auth)
