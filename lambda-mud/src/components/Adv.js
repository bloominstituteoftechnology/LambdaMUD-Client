// This file contains everything for the Adventure console, where users interact with the game

import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

class Adv extends Component {
    constructor(props) {
        super(props); 
        this.state = {
           uuid: '',
           name: '',
           location: '',
           description: '',
           players: [],
           occupants: 0,
           move: '',
           message: '',
           moveDir: '',
           messages: [],
           sayName: '',
        };
        // define the connection to the pusher app used to send messages and broadcasts between players
        this.pusher = new Pusher('bfb05bd9647c3539a67d', {
            cluster: 'us2',
            forceTLS: true
        });
    }

    componentDidMount() {
        console.log('ADV CDM')
        const token = localStorage['token'];
        // make a get request to retrieve all the information about the player and their current location
        
        axios
            .get('http://lambdamud-by-cameronsray.herokuapp.com/api/adv/init/', {
                headers: {
                    Authorization: `Token ${token}`,
                    // 'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log('Adv CDM GET response:, ', response);
                this.setState(
                    {
                        uuid: response.data.uuid,
                        name: response.data.name,
                        location: response.data.title,
                        description: response.data.description,
                        players: response.data.players,
                    }
                );
                // upon succesful response from the server, subscribe the user to the pusher channel to get new messages
                this.pusher
                    .subscribe(`p-channel-${this.state.uuid}`)
                    .bind("broadcast", broadcastData => {
                        console.log('broadcast data: ', broadcastData);
                        this.setState({ moveDir: broadcastData.message });
                        this.state.messages.push(this.state.moveDir);
                    });
                console.log('state.messages after pusher bind: ', this.state.messages);
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    // remove token from localStorage and send user back to homepage
    handleLogout = () => {
        localStorage.removeItem('token');
        this.props.history.push('/')
    }

    // This function allows a user to move between rooms in the game
    move = event => {
        event.preventDefault();
        console.log('Move function called');
        const token = localStorage['token'];
        const data = {
            'direction': event.target.value
        };
        axios
            .post('http://lambdamud-by-cameronsray.herokuapp.com/api/adv/move/', data, {
                headers: {
                    Authorization: `Token ${token}`,
                    // 'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log('Move GET request response:', response);
                return this.setState(
                    {
                        location: response.data.title,
                        description: response.data.description,
                        players: response.data.players,
                    }
                )
            })
            .catch(err => {
                console.log(err.response);
            })
    }
   
    // Update state values with form input values:
    handleInputChange = event => {
        console.log('handleInputChange called');
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSaySubmit = event => {
        const token = localStorage['token'];
        const data = {'message': this.state.message};
        console.log('Say data to post: ', data);
        this.state.messages.push(this.state.message)
        axios
            .post('http://lambdamud-by-cameronsray.herokuapp.com/api/adv/say/', data, {
                headers: {
                    Authorization: `Token ${token}`,
                    // 'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log('Say response: ', response);
                this.setState(
                    {
                        sayName: response.data.username,
                        message: '',
                    }
                )
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    render() {
        return (
            <div className='adv-console-container'>
                <button onClick={this.handleLogout}>Log Out</button>

                <h2>Adventure Console</h2>
                <p>Hello, {this.state.name}</p>
                <p>Your location: {this.state.location}</p>
                <p>{this.state.description}</p>
                <p>Other players in this room:</p>
                {this.state.players ? this.state.players.map((m, i) => {
                    return (
                        <div key={i}>
                            {m}
                        </div>
                    )
                }) : null }

                <h3>Move:</h3>
                <button value='n' onClick={this.move}>North</button>
                <button value='s' onClick={this.move}>South</button>
                <button value='e' onClick={this.move}>East</button>
                <button value='w' onClick={this.move}>West</button>

                <h3>Say:</h3>
                <input 
                    name='message' 
                    type='text'
                    placeholder='message to say' 
                    value={this.state.message} 
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleSaySubmit}>Submit</button>

                <h3>Messages:</h3>
                
                {this.state.messages ? this.state.messages.map((m, i) => {
                    return (
                        <div key={i}>
                            {this.state.sayName} said: {m}
                        </div>
                    )
                }) : null}
            </div>
        );
    }
}

export default Adv;

  // broadcast = () => {
    //     console.log('broadcast func called');
    //     const token = localStorage['token'];
    //     const data = { saidMessage: this.state.sayMessage };
    //     this.setState({ sayMessage: '', displayMessage: '' });
    //     axios
    //         .post('http://lambdamud-by-cameronsray.herokuapp.com/api/adv/broadcast/', data, {
    //             headers: {
    //                 Authorization: `Token ${token}`,
    //                 // 'Content-Type': 'application/json',
    //             }
    //         })
    //         .then(response => {
    //             console.log('Broadcast response: ', response);
    //             return this.setState(
    //                 {
    //                     displayMessage: response.data.saidMessage
    //                 }
    //             )
    //         })
    //         .catch(err => {
    //             console.log(err.response);
    //         })
    // }
