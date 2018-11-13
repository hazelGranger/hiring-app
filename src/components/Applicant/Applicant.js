import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserCard from '../../components/UserCard/UserCard.js'
import { getUserList } from '../../redux/chatuser.redux.js'


class Applicant extends Component {
  componentDidMount(){
    this.props.getUserList('applicant')
  }
  render(){
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
)(Applicant)
