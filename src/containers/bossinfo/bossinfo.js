import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { NavBar, List, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../components/AvatarSelector/AvatarSelector.js'
import { updateInfo } from '../../redux/user.redux.js'


class BossInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      desc:'',
      jobTitle: '',
      salary: '',
      company: ''
    }
    this.updateInfo = this.updateInfo.bind(this)
  }
  handleFormChange(type, value){
    this.setState({
      [type]: value
    })
  }
  updateInfo(){
    this.props.updateInfo(this.state)
  }
  render(){
    const redirect = this.props.redirectTo,
          path = this.props.location.pathname
    return(
      <div>
        {redirect&&redirect!==path?<Redirect to={redirect} ></Redirect>:null}
        <NavBar mode="dark">Boss Info Supplements</NavBar>
        <AvatarSelector
          selectAvatar={(imgName)=>{
            this.setState({avatar:imgName})
          }}
        ></AvatarSelector>
        <List>
          <InputItem onChange={v=>this.handleFormChange('jobTitle',v)}>job-title</InputItem>
          <InputItem onChange={v=>this.handleFormChange('company', v)}>company</InputItem>
          <InputItem onChange={v=>this.handleFormChange('salary', v)}>salary</InputItem>
          <TextareaItem
            title='job-desc'
            autoHeight
            rows={3}
            onChange={v=>this.handleFormChange('desc',v)}
          >
          </TextareaItem>
          <Button type="primary" onClick={this.updateInfo}>save</Button>
        </List>
      </div>
    )
  }

}

export default connect(
  state => state.user,
  { updateInfo }
)(BossInfo)
