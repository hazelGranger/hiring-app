import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { NavBar } from 'antd-mobile'

import Boss from '../../components/Boss/Boss'
import Applicant from '../../components/Applicant/Applicant'
import Msg from '../../components/Msg/Msg'
import UserCenter from '../../components/UserCenter/UserCenter'

import NavTabBar from '../../components/navtabbar/navtabbar'

import { getMsgList, receiveMsg } from '../../redux/chat.redux'


class Dashboard extends Component {
  componentDidMount(){
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.receiveMsg()
    }
  }
  render(){
    const { pathname } = this.props.location,
          user = this.props.user
    const tabList = [
      {
        path: '/boss',
        text: 'applicants',
        icon: 'boss',
        title: 'applicants list',
        hide: user.type==='applicant',
        component: Applicant
      },
      {
        path: '/applicant',
        text: 'boss',
        icon: 'job',
        title: 'bosses list',
        hide: user.type==='boss',
        component: Boss
      },
      {
        path: '/msg',
        text: 'message',
        icon: 'msg',
        title: 'messages list',
        component: Msg
      },
      {
        path: '/me',
        text: 'me',
        icon: 'user',
        title: 'User Center',
        component: UserCenter
      }
    ]
    return(
      <div>
        <NavBar mode="dark"
        >{tabList.find(v=>v.path===pathname).title}</NavBar>
          <div>
            <Switch>
              {
                tabList.map(v=>(
                  <Route key={v.text} path={v.path} component={v.component}></Route>
                ))
              }
            </Switch>
          </div>
        <NavTabBar data={tabList} unread={this.props.chat.unread} />
      </div>
    )
  }
}

export default connect(
  state=>state,
  { getMsgList, receiveMsg }
)(Dashboard)
