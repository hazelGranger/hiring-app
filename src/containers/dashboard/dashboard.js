import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import { NavBar } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

import Boss from '../../components/Boss/Boss'
import Applicant from '../../components/Applicant/Applicant'
import Msg from '../../components/Msg/Msg'
import UserCenter from '../../components/UserCenter/UserCenter'

import NavTabBar from '../../components/navtabbar/navtabbar'

import { getMsgList, receiveMsg } from '../../redux/chat.redux'


class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.receiveMsg()
    }
  }

  render() {
    const { pathname } = this.props.location,
      { user } = this.props,
      tabList = [{
        path: '/boss',
        text: 'applicants',
        icon: 'boss',
        title: 'applicants list',
        hide: user.type === 'applicant',
        component: Applicant
      },
      {
        path: '/applicant',
        text: 'boss',
        icon: 'job',
        title: 'bosses list',
        hide: user.type === 'boss',
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
    return (
      <div>
        <NavBar mode="dark">{tabList.find(v=>v.path === pathname).title}</NavBar>
        <div className="route-container">
            <QueueAnim delay={300} type="scale">
            {
              tabList.map(v=>(
                v.path === pathname ? (
                  <Route key={v.text} path={v.path} component={v.component}></Route>
                ) : null
              ))
            }
            </QueueAnim>
        </div>
        <NavTabBar data={tabList} unread={this.props.chat.unread} />
      </div>
    )
  }
}

Dashboard.propTypes = {
  chat: PropTypes.object,
  getMsgList: PropTypes.func,
  receiveMsg: PropTypes.func,
  location: PropTypes.object,
  user: PropTypes.object
}

export default connect(
  state=>state,
  { getMsgList, receiveMsg }
)(Dashboard)
