import React, { Component } from 'react'

import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter

class NavTabBar extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render(){
    const tablist = this.props.data.filter(v=>!v.hide),
          { pathname } = this.props.location
    return(
      <div>
        <TabBar>
          {
            tablist.map(v=>(
              <TabBar.Item
                key={v.path}
                title={v.title}
                icon={{uri: require(`./img/${v.icon}.png`)}}
                badge={v.path==='/msg'?this.props.unread:0}
                selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                selected={pathname===v.path}
                onPress={()=>{
                  this.props.history.push(v.path)
                }}
                ></TabBar.Item>
            ))
          }
        </TabBar>
      </div>
    )
  }
}

export default NavTabBar
