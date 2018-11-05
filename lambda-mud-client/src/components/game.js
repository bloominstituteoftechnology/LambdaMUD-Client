import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
class Game extends Component {
    state = {
        name: "",
        title: "",
        description: "",
        players: [],
        uuid: "",
        direction: "",
        message: "",
        messages: [],
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
        this.setState(
          //name: response.data.name,
          //title: response.data.title,
          //description: response.data.description,
          //players: response.data.players
          response.data
         )
       }) 
         .catch(error => console.log(error));
  }

  connectToPusher = (uuid) => {
      const pusher = new Pusher('9562ed279b0b2b7a7668', {cluster: 'us2',forceTLS: true});
      console.log('p-channel-' + uuid)
      const channel = pusher.subscribe('p-channel-' + uuid);
      channel.bind('broadcast', data => {
          console.log(data.message);
          this.setState({messages: [this.state.messages, data.message]})
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
    console.log(direction, "direction string")
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
        let messages = this.state.messages.slice();
        messages.push(response.data.message);
        this.setState({messages: messages, message: ''})
         
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
                <form onSubmit= {this.moveHandler}>
               <input name="direction" onChange={this.changeHandler} value={this.state.direction} placeholder="Where Should We Go Next?" />
               <button>Let's go!</button>
               </form>
               </div>
               
               <div className = "players-display">
               <div className = "players">
               <h3>Who's in Here?</h3>
               {this.state.players.map(player => {
                return(
                <div key = {Math.random()} className = "playersInRoom">
                <p>
                {player}
                </p>
                </div>
                )
                })}
                </div>
                </div>
                <div className="messages-display">
                <h3>Say Something!</h3>
               <form onSubmit= {this.messageHandler}>
               <input name="message" onChange={this.changeHandler} value={this.state.message} placeholder="What Do You Want to Say?" />
               <button>Say it!</button>
               </form>
               <div className="chat-container">
               <h3> What is Everyone Else Saying? </h3>
                {this.state.messages.map(message => {
                return(
                <div key = {Math.random()} className = "chat-container">
                <p>
                {message}
                </p>
                </div>
                )
                })}
               </div>
               </div>
               </div>
            </div>
        )
    }
}

export default Game;