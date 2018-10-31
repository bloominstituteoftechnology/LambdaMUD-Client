// Game.js
// Implements a game display and shows messages from the Django server and the Pusher server.

import React from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';


class Game extends React.Component {
    constructor(props) {
        super(props)
        // Initializes state: input field, player name, a log of rooms and messages, 
        // player's UUID, a boolean of whether Pusher channel has been subscribed to
        this.state = {
            input: '',
            name: '',
            movesLog: [],
            uuid: null,
            channelSubbed: false
        }
        this.channel = null;
        
    }

    componentDidMount = () => {
        // Gets token from localStorage
        const token = localStorage.getItem('token');
        // Makes call to Django server to initialize the player in the game
        axios.get('https://lambdamud-ghr.herokuapp.com/api/adv/init/', {headers: {Authorization: `Token ${token}`}})
        .then(response => {
            // Sets state with data received from axios call
            this.setState({
                name: response.data.name,
                movesLog: [{
                    title: response.data.title,
                    description: response.data.description,
                    players: response.data.players,
                }],
                uuid: response.data.uuid
            })
            // Instantiates a new Pusher object
            const pusher = new Pusher('990ddef61491c8ebceb4', {
                cluster: 'us2'
            })
            // Subscribes channel to Pusher if UUID is present
            if (this.state.uuid) {
                this.channel = pusher.subscribe(`p-channel-${this.state.uuid}`, this.state.uuid);
            }
            // Sets boolean on state that Pusher channel has been subscribed
            this.setState({channelSubbed: true})
            if (this.state.channelSubbed) {
                // Binds channel to receive broadcast messages
                this.channel.bind('broadcast', data => {
                    this.setState({movesLog: [...this.state.movesLog, {message: data.message}]}
                )})
            }
            
        })
        
    }
    // Parses commands from the input field
    parseCommand = (event) => {
        event.preventDefault();
        // These first four conditionals handle move directions
        if (this.state.input.toLowerCase() === 'n' || this.state.input.toLowerCase() === 'north') {
            this.handleMove('n')
        } else if (this.state.input.toLowerCase() === 's' || this.state.input.toLowerCase() === 'south') {
            this.handleMove('s')
        } else if (this.state.input.toLowerCase() === 'e' || this.state.input.toLowerCase() ==='east') {
            this.handleMove('e')
        } else if (this.state.input.toLowerCase() === 'w' || this.state.input.toLowerCase() === 'west') {
            this.handleMove('w')
        // Handles say function otherwise
        } else {
            this.handleSay(this.state.input)
        }
        // Resets input field to blank string when form is submitted
        this.setState({input: ''})
    }

    // Handles move function in any of four directions
    handleMove = (direction) => {
        // Gets token from localStorage
        const token = localStorage.getItem('token');
        const headers = {
            "Authorization": `Token ${token}`, 
            "Content-Type": "application/json"
        }
        const data = {
            "direction": direction
        }
        // Sends axios call to move endpoint with direction data and auth/content headers
        axios.post('https://lambdamud-ghr.herokuapp.com/api/adv/move/', data, {headers: headers})
        .then(response => {
            this.setState({
                movesLog: [...this.state.movesLog, {
                    title: response.data.title,
                    description: response.data.description,
                    players: response.data.players,
                    error: response.data.error_msg
                }]
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    // Handles sending messages to players in current room
    handleSay = (message) => {
        const token = localStorage.getItem('token');
        const headers = {
            "Authorization": `Token ${token}`, 
            "Content-Type": "application/json"
        }
        const data = {
            "message": message
        }
        // Sends axios call to say endpoint with message data and auth/content headers
        axios.post('https://lambdamud-ghr.herokuapp.com/api/adv/say/', data, {headers: headers})
        .then(response => {
            this.setState({
                movesLog: [...this.state.movesLog, {
                    message: response.data.message,
                    players: [this.state.name]
                }]
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    // Updates input field in state
    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render () {
        // Reverses movesLog for display
        const history = this.state.movesLog.slice().reverse();
        console.log(this.state.movesLog)
        return (
            <div>
                <div className="gameBox">
                {/* Displays player's username */}
                <p>Welcome, {this.state.name}</p>
                <div className="printList">
                    {/* Maps over reversed movesLog and displays what is present in that move */}
                    {history.map(move => 
                    <div>
                        {move.title ? <h4 className="titleH4">{move.title}</h4> : ''}
                        {move.description ? <p>{move.description}</p> : ''}
                        {move.players ? move.players.length ? <p>Players: {move.players.join(', ')}</p> : '' : ''}
                        {move.message ? <p className="messageP">{move.message}</p> : ''}
                        {move.error ? <p className="errorP">{move.error}</p> : ''}
                    </div>
                    )}
                </div>
                {/* Form for input field and submit button */}
                <form onSubmit={this.parseCommand} className="inputAndButton">
                    <input type="text" 
                    name="input" 
                    value={this.state.input} 
                    placeholder="Type a direction or command or message here." 
                    onChange={this.changeHandler} 
                    className="gameInput"/>
                    <button type="submit" className="gameSubmit">Submit</button>
                </form>
                <button type="button" onClick={this.props.logout}>Log out</button>
                </div>

            </div>
        )
    }
}

export default Game;