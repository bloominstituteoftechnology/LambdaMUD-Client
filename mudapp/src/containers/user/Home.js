import React, { Component } from 'react'
import axios from 'axios'
import Pusher from 'pusher-js';

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

      //Pusher.logToConsole = true;
      let pusher = new Pusher('b2b9253c91c4b0f56a74', {
        cluster: 'us2'
      });
      let channel = pusher.subscribe(`mudappchannel-${res.data.uuid}`);
      channel.bind('pusher:subscription_succeeded', function(members) {
        console.log('successfully subscribed!');
      });
      channel.bind('broadcast', function(data) {
        // Broadcast message to players
        console.log('data',data)
        console.log('message', data.message)
      });

      let roomInfo = {
        apiKey: apiKey,
        username: res.data.name,
        userUUID: res.data.uuid,
        roomTitle: res.data.title,
        roomDescription: res.data.description,
        players: res.data.players,
      }
      this.props.updateRooms(roomInfo)
    })
    .catch(err => {
      console.log('Second', err)
    });
  }

  render() {
    return (
      <div className="Home Layer">
        <Register initPlayer={this.initPlayer} />
        <br/>
        <hr/>
        <br/>
        <Login initPlayer={this.initPlayer} />
      </div>
    )
  }
}

export default Home;
