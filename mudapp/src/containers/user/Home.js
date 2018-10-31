import React, { Component } from 'react'
import axios from 'axios'

import Register from '../../components/user/Register';
import Login from '../../components/user/Login';

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
      <main className="Home Layer">
        <Register initPlayer={this.initPlayer} />
        <br/>
        <hr/>
        <br/>
        <Login initPlayer={this.initPlayer} />
      </main>
    )
  }
}

export default Home;
