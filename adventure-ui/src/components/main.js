import React, {Component} from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

import './main.css'


class GameView extends Component {
    constructor() {
        super();
        this.state = {
            uuid: '',
            name: '',
            title: '',
            description: '',
            players: [],
            message: '',
            archivedMessages: [],
            input: '', 
            direction: '',
        };
    }

// ----- Get data from server ----- 
componentDidMount() {
    this.handleData();
}

handleData = () => {
    console.log('has the handleData function been called?')
    const header = {
      headers: {
        authorization: `Token ${localStorage.getItem('token')}`
      }
    };

    axios
    .get('https://baldwin-adv-project.herokuapp.com/api/adv/init/', header)
    .then(response => {
        console.log("---uuid--->", response.data.uuid);
        this.handlePusher(response.data.uuid);
      console.log(response)
      this.setState(response.data)
      
      console.log(this.state)
    })
    .catch(error => {console.log(error)
    })
  }

// ----- handler functions for player moves -----
handleChange = event => {
    this.setState({ [event.target.name]: event.target.value});
}

handleMove = (event) => {
    console.log('has the handleMove function been called?')
    event.preventDefault();

    const direction = {
        direction: this.state.direction
        };

    const header = {
        headers: {
          authorization: `Token ${localStorage.getItem('token')}`
        }
      };
    
    axios
    .post('https://baldwin-adv-project.herokuapp.com/api/adv/move/', direction, header)
    .then(response => {
        console.log(response)
        this.setState(response.data)
        console.log('response in handleMove', response.data)
    })
    .catch(error => console.log(error));
};

handleMessage = (event) => {
    event.preventDefault();

    const message = {
        message: this.state.message
    };

    const header = {
        headers: {
          authorization: `Token ${localStorage.getItem('token')}`
        }
      };

    axios
    .post('https://baldwin-adv-project.herokuapp.com/api/adv/say/', message, header)
    .then(response => {
        let archivedMessages = this.state.archivedMessages.slice();
        archivedMessages.push(response.data.message);
        console.log("check response.data in handleMessage", response.data);
        this.setState({archivedMessages: archivedMessages, message: ''});
    })  
    .catch(error => {
        console.log(error);
    });
};

//https://pusher.com/tutorials/react-websockets/

handlePusher = (uuid) => {
    const pusher = new Pusher(
        'b8d36bebdfa0e6706244', 
        { cluster: 'us2', 
        forceTLS: true 
        });
        console.log('p-channel-' + uuid);
    const channel = pusher.subscribe('p-channel-' + uuid);
    channel.bind('broadcast', data => {
        console.log('message in handlePusher', data.message)
        this.setState({archivedMessages: [...this.state.archivedMessages, data.message], test: '' });
    });
}

    render() {
        return(
        <div className = "game-view">
            <div className = "main-container">
            <div className = "room-info">
                <h4>location: {this.state.title}</h4>
                <p>{this.state.description}</p>
                <div className = "directions">
                <p>enter 'n' to move North</p>
                <p>enter 's' to move South</p>
                <p>enter 'e' to move East</p>
                <p>enter 'w' to move West</p>
                </div>
            </div>
            <form onSubmit = {this.handleMove}>
                <input className = "direction-input"
                name = 'direction'
                value = {this.state.direction}
                onChange = {this.handleChange}
                placeholder = "enter a move"
                />
                <button>
                    Make Your Move
                </button>    
            </form>

        {/* map over the players */}
            <div className = "players-container">
            <div className = "players">
            <h5>Players in this room </h5>
                {this.state.players.map(player => {
                    console.log('state in players', this.state);
                    return(
                        <div key = {Math.random()} className = "players">
                            <p>
                                {player}
                            </p>
                        </div>
                    )
                })}
            </div>
            </div>
        </div>

        {/* map over the messages */}
        <div className = "message-container">
            {/* input form for chat */}
            <div>
                <p>
                    {this.state.message}
                </p>        
            </div>

            <form onSubmit = {this.handleMessage}>
                    <label className = "custom-label">
                    chat
                    </label>
                    <input className = "message-input"
                    name = 'message'
                    value = {this.state.message}
                    onChange = {this.handleChange}
                    placeholder = "enter a message"
                    />
                    <button>
                        Submit
                    </button>    
                </form>   

            <div className = "messages">
            <h5> Messages </h5>
                {this.state.archivedMessages.map(message => {
                    console.log('state in messages', this.state);
                    return(
                        <div key = {Math.random()} className = "messages">
                            <p>
                                {message}
                            </p>
                        </div>
                    )
                })}
            </div>
            </div>


        </div>
        )
    
    }
}

export default GameView;


// For Testing:
// e27485038b0c33c097040073c4d5326342e0b41d
// https://baldwin-adv-project.herokuapp.com/api/adv/say/

// curl -X POST -H 'Authorization: Token e27485038b0c33c097040073c4d5326342e0b41d' -H "Content-Type: application/json" -d '{"message":"Hello, world!"}' https://baldwin-adv-project.herokuapp.com/api/adv/say/

