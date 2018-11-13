import { Component } from 'react'
import axios from 'axios'

import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'

import { loadUserInfo } from '../../redux/user.redux.js'

@withRouter

class AuthRoute extends Component {
  componentDidMount() {

    const publicPath = ['/login', '/register'],
          pathname = this.props.location.pathname

    if (publicPath.indexOf(pathname)>-1) {
      return null
    }

    axios.get('/user/info').then(res => {
      if (res.status===200) {
        // console.log(res.data,this.props)
        if (res.data.code === 0) {
          //with login info
          this.props.loadUserInfo(res.data.data)
        }else{
          this.props.history.push("/login")
        }
      }
    })
  }
  render(){
    return null
  }
}

export default connect(null,{loadUserInfo})(AuthRoute)
