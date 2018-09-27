import React, { Component } from 'react';

import axios from 'axios';
import Pusher from 'pusher-js';

var pusher = new Pusher('776eccb17eb4a3b3de84', {
  cluster: 'eu',
  forceTLS: true
});

class GameView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: '',
            name: '',
            title: '',
            description: '',
            players: [],
        }
    }
componentDidMount() {
    axios
      .get('https://mylambdamud-project.herokuapp.com/api/adv/init', {
        headers: {
          Authorization: 'Token ' + localStorage.getItem('jwt'),
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        const { uuid, name, title, description, players } = response.data;
            this.setState({uuid, name, title, description, players, init: true,});
        var channel = pusher.subscribe('p-channel-' + response.data.uuid);
          channel.bind('broadcast', function(data) {
            alert(JSON.stringify(data));
        });
      })
      .catch(error => {
        console.log(error.response)
      });
  };

    render() {
        return (
            <div>
            <p> uuid: {this.state.uuid}</p>
            <p> name: {this.state.name}</p>
            <p> title: {this.state.title}</p>
            <p> description: {this.state.description}</p>
            <p> players: {this.state.players.map(player => {
            return <li key={Math.random()}>{player.name}</li>
            })}</p>
            </div>
        );
    }
}

export default GameView;
