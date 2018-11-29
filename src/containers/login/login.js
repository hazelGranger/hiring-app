import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { WingBlank, WhiteSpace, List, InputItem, Button } from 'antd-mobile'

import Logo from '../../components/Logo'
import { login } from '../../redux/user.redux.js'

class Login extends Component{

  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.toRegister = this.toRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  toRegister() {
    this.props.history.push('/register')
  }

  handleFormChange(type, value) {

    this.setState({
      [type]: value
    })
  }

  handleLogin() {
    this.props.login(this.state)
  }

  render(){
    const msg = this.props.msg
    return(
      <div>
        <Logo />
        { this.props.redirectTo&&this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo} />:null}
        <WingBlank>
          {msg ? <p className="error-msg">{msg}</p> : null}
          <List>
            <InputItem onChange={v => this.handleFormChange('username',v)}>Username</InputItem>
            <InputItem onChange={v => this.handleFormChange('password', v)}>Password</InputItem>
          </List>
          <WhiteSpace />
          <List>
            <Button type="primary"
              onClick={this.handleLogin}
              >Login</Button>
            <WhiteSpace />
            <Button type="primary" onClick={this.toRegister}>Register</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => state.user,
  { login }
)(Login)
