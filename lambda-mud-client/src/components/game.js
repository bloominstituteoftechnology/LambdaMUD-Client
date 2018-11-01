import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
class Game extends Component {
    state = {
        name: "",
        title: "",
        description: "",
        players: "",
        uuid: ""
    };

componentDidMount() {
    const URL = 'https://sania-parekh-lambda-mud.herokuapp.com'
    const key = "Token " + localStorage.getItem("key")
    axios
    .get(`${URL}/api/adv/init/`, {
        headers: {
            Authorization: key
        }
    })
    .then(response => {
        this.connectToPusher(response.data.uuid);
        this.setState({
          name: response.data.name,
          title: response.data.title,
          description: response.data.description,
          players: response.data.players
         })
       }) 
         .catch(error => console.log(error));
  }

  connectToPusher = (uuid) => {
      const pusher = new Pusher('9562ed279b0b2b7a7668', {cluster: 'us2',forceTLS: true});
      console.log('p-channel-' + uuid)
      const channel = pusher.subscribe('p-channel-' + uuid);
      channel.bind('broadcast', function(data) {
          console.log(data.message);
      });
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  moveHandler = e => {
    e.preventDefault();
    const URL = 'https://sania-parekh-lambda-mud.herokuapp.com'
    const direction = {
        direction: this.state.direction
    };
    const key = "Token " + localStorage.getItem("key")
    axios
    .post(`${URL}/api/adv/move/`, direction, {
        headers: {
            Authorization: key
        }
    })
    .then(response => {
        this.setState({
            name: response.data.name, 
            title: response.data.title, 
            description: response.data.description,
            players: response.data.players, 
            direction: ''
        })
      })
      .catch(error => console.log(error));
  }

  messageHandler = e => {
    e.preventDefault();
    const URL = 'https://sania-parekh-lambda-mud.herokuapp.com'
    const message = {
        message: this.state.message
    };
    const key = "Token " + localStorage.getItem("key")
    axios
    .post(`${URL}/api/adv/say/`, message, {
        headers: {
            Authorization: key
        }
    })
    .then(response => {
        console.log('say: ', response.data)
        this.setState({message: ''})
         
        })
        .catch(error => console.log(error))

  }

    render() {
        return (
            <div className="game-container">
               <div className="game-contents">
               <div className="room-container">
                <h3>Where are We?: {this.state.title}</h3>
                <h4>{this.state.description}</h4>
                <div className="directions options">
                <h4>type 'n' to go north</h4>
                <h4>type 's' to go south</h4>
                <h4>type 'e' to go east</h4>
                <h4>type 'w' to go west</h4>
                </div>
               </div>
               <form onSubmit= {this.moveHandler}>
               <input name="navigation-input" onChange={this.changeHandler} value={this.state.direction} placeholder="Where Should We Go Next?" />
               <button>Let's go!</button>

               </form>
               </div>
            </div>
        )
    }
}

export default Game;