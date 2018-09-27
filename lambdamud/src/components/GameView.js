import React, { Component } from 'react';
import './login.css';
import axios from 'axios';
import Pusher from 'pusher-js';
import { Button } from 'reactstrap';


var pusher = new Pusher('776eccb17eb4a3b3de84', {
  cluster: 'eu',
  // forceTLS: true
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
          Authorization: 'Token ' + localStorage.getItem('key'),
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        const { uuid, name, title, description, players } = response.data;
            this.setState({uuid, name, title, description, players, init: true,});
        var channel = pusher.subscribe('p-channel-' + response.data.uuid);
          channel.bind('broadcast', function(data) {
             alert(data.message);
        });
      })
      .catch(error => {
        console.log(error.response)
      });
  };

    render() {
        return (
            <div className="game-interface-container">
            <div>
            <p> {this.state.uuid}UUID: 343-obu34 </p>
            <p> CURRENT ROOM: Outside Cave Entrance {this.state.title}(TITLE): </p>
            <p> DESCRIPTION: North of you, the cave mount beckons {this.state.description}</p>
            </div>
            <div>
            <p> NAME: testuser1 {this.state.name}</p>
            <p> PLAYERS: {this.state.players.map(player => {
            return <li key={Math.random()}>{player.name}</li>
            })}Pebbles</p>
            <p className="message-line">Brady is waiting for you outside of the foyer.</p>
            </div>
            <textarea className="message-box"></textarea><Button className="message-button">Send</Button>
            </div>
        );
    }
}

export default GameView;
