import React, { Component } from 'react'

import { Card, WingBlank, WhiteSpace } from 'antd-mobile'

class UserCard extends Component {

  render(){
    const Header = Card.Header,
          Body = Card.Body,
          Footer = Card.Footer
    const {username, type, jobTitle, desc, avatar, company, salary} = this.props.userdata
    return avatar?(
      <WingBlank>
        <WhiteSpace size='lg'></WhiteSpace>
        <Card className="user-card">
          <Header
            title={username}
            thumb={require(`../AvatarSelector/img/${avatar}.png`)}
          ></Header>
          <Body>
            {type==='boss'?<p>{company}</p>:null}
            <p>{jobTitle}</p>
            { desc ? (
              <ul>
                {
                  desc.split('\n').map((d,i)=>(
                    <li key={i}>{d}</li>
                  ))
                }
              </ul>):null
            }
            {type==='boss'?<p>{salary}</p>:null}
          </Body>
          <Footer></Footer>
        </Card>
      </WingBlank>
    ):null
  }
}

export default UserCard
