import React, {Component} from 'react';
import axios from 'axios';

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
    .then(response =>{
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
        archivedMessages.push(response.data);
        console.log("check response.data in handleMessage", response.data);
        this.setState({archivedMessages: archivedMessages, message: ''});
    })  
    .catch(error => {
        console.log(error);
    });
};

    render() {
        return(
        <div>
            <div>
                <h4>location: {this.state.title}</h4>
                <p>{this.state.description}</p>
            </div>
            <form onSubmit = {this.handleMove}>
                <input
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
        )
    
    }
}

export default GameView;