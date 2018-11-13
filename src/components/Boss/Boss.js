import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserCard from '../../components/UserCard/UserCard.js'
import { getUserList } from '../../redux/chatuser.redux.js'


class Boss extends Component {

  componentDidMount(){
    this.props.getUserList('boss')
  }
  render(){
    console.log(this.props);
    const { userList } = this.props
    return(
      <div>
        { userList.map(u=>(
            <UserCard key={u.username} userdata={u} />
        ))}
      </div>
    )
  }
}

export default connect(
  state=>state.chatuser,
  { getUserList }
)(Boss)
