import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Logo from '../../components/Logo/'
import { register } from '../../redux/user.redux.js'

import { WingBlank, WhiteSpace, List, InputItem, Button, Radio } from 'antd-mobile'

class Register extends Component{

  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
      type: "applicant"
    }
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleFormChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  handleRegister() {
    this.props.register(this.state)
    //console.log(this.state)
  }


  render(){
    const RadioItem = Radio.RadioItem
    const msg = this.props.msg
    return(
      <div>Register
        { this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
        <Logo />
        <WingBlank>
          {msg ? <p className="error-msg">{msg}</p> : null}
          <List>
            <InputItem
              onChange={v=>this.handleFormChange('username',v)}
              >Username</InputItem>
            <InputItem
              onChange={v=>this.handleFormChange('password',v)}
              type="password"
              >Password</InputItem>
            <InputItem
              onChange={v=>this.handleFormChange('repeatPassword',v)}
              type="password">Repeat Password</InputItem>
            <WhiteSpace />
            <RadioItem
              onChange={v=>this.handleFormChange('type','applicant')}
              checked={this.state.type==="applicant"}>Applicant</RadioItem>
            <RadioItem
              onChange={v=>this.handleFormChange('type','boss')}
              checked={this.state.type==="boss"}>Boss</RadioItem>
            <WhiteSpace />
            <Button type="primary"
              onClick={this.handleRegister}>Register</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => state.user,
  // state => ({
  //   user: state.user
  // 这种写法需要获取 this.props.user.
  // 上面的写法直接获取 属性， this.props.username, this.props.type, 属性已经被展开
  // }),
  { register }
  // dispatch => ({
  //     register: userinfo => dispatch(register(userinfo))
  // })
)(Register)
