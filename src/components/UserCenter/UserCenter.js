import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import browserCookie from 'browser-cookies'

import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'

import { logout } from '../../redux/user.redux'

class UserCenter extends Component {

  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    console.log('lall')
    Modal.alert(
      'Logout',
      'Are you sure?', [
        {
          text: 'cancel',
          onPress: ()=>console.log('cancel')
        },
        {
          text: 'confirm',
          onPress: ()=>{
            browserCookie.erase('userid')
            this.props.logout()
          }
        }
      ]
    )
  }

  render() {
    const { username, jobTitle, desc, salary, company, avatar, redirectTo, type } = this.props.user
    return username ? (
      <div>
        <Result
          img={<img src={require(`../AvatarSelector/img/${avatar}.png`)} style={{ width: 50 }} alt="" />}
          title={username}
          message={type === 'boss' ? company : null}
        />
        <List renderHeader={()=>'Intro'}>
          <List.Item multipleLine>
            {jobTitle}
            {desc.split('\n').map(d => (
              <List.Item.Brief key={d}>{d}</List.Item.Brief>
            ))}
            {salary ? <List.Item.Brief>{salary}</List.Item.Brief> : null}
          </List.Item>
        </List>
        <WhiteSpace />
        <Button onClick={this.handleLogout} style={{ color: '#108ee9' }}>Logout</Button>
      </div>
    ) : <Redirect to={redirectTo} />
  }
}

export default connect(
  state=>state,
  { logout }
)(UserCenter)
