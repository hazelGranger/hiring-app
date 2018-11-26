import React, { Component } from 'react'
import { connect } from 'react-redux'

import { List, Badge } from 'antd-mobile'

class Msg extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  getLast(arr){
    return arr[arr.length-1]
  }

  render(){
    let msgGroup = {}
    this.props.chat.chatmsg.forEach(m=>{
      msgGroup[m.chatid] = msgGroup[m.chatid] || []
      msgGroup[m.chatid].push(m)
    })

    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const time_a = this.getLast(a).create_time
      const time_b = this.getLast(b).create_time
      return time_b-time_a
    })

    console.log(chatList,'chatList')

    const Item = List.Item,
          Brief = List.Item.Brief

    return(
      <div>
          {
            chatList.map((v,i)=>{
              const lastMsg = this.getLast(v).content
              const targetId = v[0].from===this.props.user._id?v[0].to:v[0].from
              const username = this.props.chat.users[targetId].username
              const avatar = this.props.chat.users[targetId].avatar
              const unreadNum = v.filter(m=>!m.read&&m.to===this.props.user._id).length
              return(
                <List key={i}>
                  <Item
                    thumb={require(`../AvatarSelector/img/${avatar}.png`)}
                    extra={<Badge text={ unreadNum } />}
                    arrow='horizontal'
                    onClick={()=>{
                      this.props.history.push(`/chat/${targetId}`)
                    }}
                  >
                    {username}
                    <Brief>
                      { lastMsg }
                    </Brief>
                  </Item>
                </List>
              )
            })
          }
      </div>
    )
  }
}

export default connect(
  state=>state,
  null
)(Msg)
