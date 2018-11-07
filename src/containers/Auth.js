import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

// import axios from 'axios'

import { login, getUserData } from '../actions'

class Auth extends Component{

  componentDidMount() {
    this.props.getUserData()
  }

  render(){
    // console.log(this.props,"AUth");
    const redirecToDashboard = <Redirect to="dashboard" />;
    const login = (
      <div>
        <p>welocome {this.props.auth.username}, {this.props.auth.age}</p>
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
    login: () => dispatch(login()),
    getUserData: () => dispatch(getUserData())
  })
)(Auth)
