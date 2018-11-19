import React, { Component } from 'react'
import io from 'socket.io-client'
import { List, InputItem, Button, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'

import { getMsgList, sendMsg, receiveMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../utli'

const socket = io('ws://localhost:9093')

class Chat extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputText: '',
      msg: []
    }
  }
  componentDidMount(){
    this.sendMsg = this.sendMsg.bind(this)
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.receiveMsg()
    }
  }
  componentWillUnmount(){
    this.props.readMsg(this.props.match.params.user)
  }
  sendMsg(){
    const from = this.props.user._id,
          to = this.props.match.params.user,
          msg = this.state.inputText
    console.log(from,to,msg);
    this.props.sendMsg({from, to, msg})
    this.setState({
      inputText: ''
    })
  }
  render() {
    const chatWithUserid = this.props.match.params.user
    const myUserId = this.props.user._id
    const users = this.props.chat.users
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===getChatId(myUserId,chatWithUserid))
		if(!users[chatWithUserid]){
			return null
		}
    return(
      <div id='chat-page'>
        <NavBar mode='dark'
          icon={<Icon type="left" />}
          onLeftClick = {()=>{
            this.props.history.goBack()
          }}
        >
          {users[chatWithUserid].username}
        </NavBar>
        <div className='msgs'>
          {chatmsgs.map((m,i) => {
            const avatar = require(`../AvatarSelector/img/${users[m.from].avatar}.png`)
            return m.from === chatWithUserid ? (
              <List key={m._id}>
                <List.Item
                  thumb={avatar}
                >
                  {m.content}
                </List.Item>
              </List>
            ):(
              <List key={m._id} className='chat-me'>
                <List.Item
                  extra={<img src={avatar} alt='avatar' />}
                >
                  {m.content}
                </List.Item>
              </List>
              )
            }
          )}
        </div>
        <div className='sendmsg'>
          <InputItem
            placeholder='type......'
            value={this.state.inputText}
            extra={
              <Button
                type='primary'
                inline
                size='small'
                onClick={this.sendMsg}
              >send</Button>}
            onChange={(v)=>{
              this.setState({inputText: v})
            }}
          ></InputItem>
        </div>
      </div>
    )
  }
}

export default connect(
  state=>state,
  { getMsgList, sendMsg, receiveMsg, readMsg }
)(Chat)
