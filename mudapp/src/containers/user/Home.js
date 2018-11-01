import React, { Component } from 'react'
import axios from 'axios'

import Register from '../../components/user/Register';
import Login from '../../components/user/Login';

import { Main, HomeHeader, HomeBody } from '../ContainerStyles';


class Home extends Component {

  initPlayer = (apiKey) => {
    axios({
      method: 'get',
      url: 'https://heromudapp.herokuapp.com/api/adv/init',
      headers: {'Authorization': `Token ${apiKey}`}
    })
    .then(res => {
      let roomInfo = {
        apiKey: apiKey,
        username: res.data.name,
        userUUID: res.data.uuid,
        roomTitle: res.data.title,
        roomDescription: res.data.description,
        players: res.data.players,
      }
      this.props.initRoomInfo(roomInfo)
    })
    .catch(err => {
      console.log('Second', err)
    });
  }

  render() {
    return (
      <Main>
        <HomeHeader>
          <h1>Welcome, Stranger</h1>
        </HomeHeader>
        <HomeBody>
          <Register initPlayer={this.initPlayer} />
          <Login initPlayer={this.initPlayer} />
        </HomeBody>
      </Main>
    )
  }
}

export default Home;
