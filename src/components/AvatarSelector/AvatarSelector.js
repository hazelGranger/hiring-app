import React, { Component } from 'react'

import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'

import './avatarselector.css'

class AvatarSelector extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  selectUserAvatar(ele){
    this.setState({
      icon: ele.icon
    })
    this.props.selectAvatar(ele.text)
  }

  render(){
    const avatarNames = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,zebra'
    const avatarList = avatarNames.split(',').map(v=>({
      icon: require(`./img/${v}.png`),
      text: v
    }))

    const gridHeader = this.state.icon?(
      <div style={{display: 'flex', alignItems: 'center'}}>
        <span>selected avatar</span>
        <img style={{width:30}} src={this.state.icon} alt=""/>
      </div>
    ):(
      <div>please select an avatar</div>
    )

    return(
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={ele=>this.selectUserAvatar(ele)}
          ></Grid>
        </List>
      </div>
    )
  }

}

export default AvatarSelector
