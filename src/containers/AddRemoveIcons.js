import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Flex, WhiteSpace, Button, Icon } from 'antd-mobile';

import { add, remove, add1s, remove1s } from '../actions'

const mapDispatchToProps = (dispatch) => ({
  add: () => dispatch(add()),
  remove: () => dispatch(remove()),
  add1s: () => dispatch(add1s()),
  remove1s: () => dispatch(remove1s())
})

const mapStateToProps = state => ({
  icons: state.icons
})

class AddRemoveIcons extends Component{
  handleAdd = () => {
    this.props.add()
  }
  handleRemove = () => {
    this.props.remove()
  }
  handleAdd1sec = () => {
    this.props.add1s()
  }
  handleRemove1sec = () => {
    this.props.remove1s()
  }
  render() {
    const iconNum = this.props.icons;
    let icons = [];
    //console.log(iconNum);
    for (var i = 0; i < iconNum; i++) {
      icons.push(<Icon type="check" key={i} type="check-circle" color="#108ee9" />)
    }
    console.log(this.props);
    return (
      <div>
        <Flex>
          <Flex.Item>12 </Flex.Item>
          <Flex.Item> 34 </Flex.Item>
        </Flex>
        <WhiteSpace siz="large" />
        <Button type="primary" size="middle">antd btn</Button>
        <WhiteSpace siz="large" />
        <Flex>
            { icons }
        </Flex>
        <WhiteSpace siz="large" />
        <Flex>
          <Flex.Item><Button type="primary" size="middle" onClick={this.handleAdd}>+</Button></Flex.Item>
          <Flex.Item><Button type="primary" size="middle" onClick={this.handleRemove}>-</Button></Flex.Item>
          <Flex.Item><Button type="primary" size="middle" onClick={this.handleAdd1sec}>+ 1s</Button></Flex.Item>
          <Flex.Item><Button type="primary" size="middle" onClick={this.handleRemove1sec}>- 1s</Button></Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddRemoveIcons)
