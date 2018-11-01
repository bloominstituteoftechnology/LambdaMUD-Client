// The component handling all of the game activity.  game state and axios calls are all handled here, as well as mesages from Pusher.

import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

const url = 'https://lambda-mud-app.herokuapp.com/api/adv/';

class Adventure extends Component {
    state = {
        name: '',
        title: '',
        description: '',
        players: [],
        error_msg: '',
        speak: '',
        direction: '',
        uuid: '',
        pusher_log: []
    }

    // sets state for direction and talk input fields
    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    // redirects to login page if there is no token in local storage, otherwise get token and places it in a header object for use as authentication in axios requests
    grabToken() {
        if(!localStorage.getItem('token')) {
            this.props.history.push('/login');
        }
        const auth_header = {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }
        return auth_header;
    }

    // function takes the direction from state and makes an axios request and sets state with the response
    handleMove = (e) => {
        e.preventDefault()
        const dir_cmd = {
            "direction": this.state.direction
        }
        const auth_header = this.grabToken();
        console.log(dir_cmd)
        axios.post(`${url}move`, dir_cmd, auth_header)
        .then(response => {
            console.log(response)
            this.setState({
                name: response.data.name,
                title: response.data.title,
                description: response.data.description,
                players: response.data.players,
                direction: '',
                pusher_log: []
            })
        })
        .catch(err => console.log(err))
    }

    // function takes the say command from state and makes an axios request.  
    handleSay = (e) => {
        e.preventDefault()
        const talk = {
            "message": this.state.speak
        }
        const auth_header = this.grabToken();
        console.log(talk)
        axios.post(`${url}say`, talk, auth_header)
        .then(response => {
            console.log(response, 'say response')
            this.setState({
                speak: '',
            })
        })
        .catch(err => console.log(err))
    }


    
    componentDidMount() {
        // gets the authentication token
        const auth_header = this.grabToken();

        // axios call to initialize the game.  auth token is passed in and state is set with the response from the server.  Then a pusher channel is subscribed to so the player will receive constant updates.  
        axios.get(`${url}init`, auth_header)
        .then(response => {
            console.log(response.data);
            this.setState({
                name: response.data.name,
                title: response.data.title,
                description: response.data.description,
                players: response.data.players,
                uuid: response.data.uuid
            })
            var pusher = new Pusher('c3edd030826f53d270b3', {
                cluster: 'us2'
            });
            var channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
            channel.bind('broadcast', data => {
                const pusher_log = this.state.pusher_log.slice();
                pusher_log.push(data.message);
                this.setState({
                    pusher_log: pusher_log
                })
            })
        })
        .catch(err => console.log(err))

    }

    render() {
        return (
            <div className='game-display' >
                <div className='player-info' >
                    <h4>Player Info</h4>
                    <p>{this.state.name}</p>
                </div>
                <div className='room-info' >
                    <h4>Room Info</h4>
                    <p>{this.state.title}</p>
                    {!!this.state.players.length && (
                        <h5>Other Players</h5>
                    )}
                    <ul className="list-display" >
                        {this.state.players.map(player => (
                        <li key={player} >{player} </li>
                        ))}
                    </ul>
                </div>
                {/* <h3>Where: {this.state.title}</h3> */}
                <h3> {this.state.description}</h3>
                {/* <h3> Who else is there?
                    <ul className="list-display" >
                        {this.state.players.map(player => (
                        <li key={player} >{player} </li>
                        ))}
                    </ul>
                </h3> */}
                {!!this.state.pusher_log.length && (
                    <h4>Activity: </h4>
                )}
                    <ul className="list-display" >
                        {this.state.pusher_log.map(log => (
                        <li key={log} >{log} </li>
                        ))}
                    </ul>

                <form className='user-input'>
                    <label>Enter Direction (n, s, e, w)</label>
                    <input value={this.state.direction} placeholder='n/s/e/w' onChange={this.handleChange} name='direction' />
                    <button type='button' onClick={this.handleMove} >Move</button>

                    <label>Say something?</label>
                    <input value={this.state.speak} placeholder='message' onChange={this.handleChange} name='speak' />
                    <button type='button' onClick={this.handleSay} >Talk</button>
                </form>


            </div>
        )
    }
}

export default Adventure;