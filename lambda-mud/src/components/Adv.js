// This file contains everything for the Adventure console, where users interact with the game

import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import '../styles/Adv.css'
import MiniMap from './MiniMap';

// Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;

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
        //    currentCoords: { x: 0, y: 0},
            currentX: 0,
            currentY: 0,
            newX: 0,
            newY: 0,
           coordsList: [],
        };
        // define the connection to the pusher app used to send messages and broadcast between players
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
                // console.log('Adv CDM GET response:, ', response);
                this.setState({
                    uuid: response.data.uuid,
                    name: response.data.name,
                    location: response.data.title,
                    description: response.data.description,
                    players: response.data.players,
                });
                this.state.coordsList.push({
                    roomName: this.state.location, 
                    roomX: this.state.currentX, 
                    roomY: this.state.currentY,
                });
                console.log('Adv CDM coordsList: ', this.state.coordsList);
                // upon succesful response from the server, subscribe the user to the pusher channel to get new messages
                this.pusher
                    .subscribe(`p-channel-${this.state.uuid}`)
                    .bind("broadcast", broadcastData => {
                        // console.log('broadcast data: ', broadcastData);
                        this.setState({ moveDir: broadcastData.message });
                        this.state.messages.push(this.state.moveDir);
                    });
                // console.log('state.messages after pusher bind: ', this.state.messages);
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
    handleMove = event => {
        event.preventDefault();
        const token = localStorage['token'];
        const data = {
            'direction': event.target.value
        };

        if (event.target.value === 'n') {
            const newX = this.state.currentX;
            const newY = this.state.currentY + 1;
            this.setState({ newX, newY });
            
        };

        if (event.target.value === 's') {
            const newX = this.state.currentX;
            const newY = this.state.currentY - 1;
            this.setState({ newX, newY });
        };

        if (event.target.value === 'e') {
            const newX = this.state.currentX + 1;
            const newY = this.state.currentY;
            this.setState({ newX, newY });
        };

        if (event.target.value === 'w') {
            const newX = this.state.currentX - 1;
            const newY = this.state.currentY;
            this.setState({ newX, newY });
        }
        // console.log('New coords: ');
        // console.log('x: ', this.state.newX); // For unknown reason, this prints current coords NOT new coords
        // console.log('y: ', this.state.newY);

        axios
            .post('http://lambdamud-by-cameronsray.herokuapp.com/api/adv/move/', data, {
                headers: {
                    Authorization: `Token ${token}`,
                    // 'Content-Type': 'application/json',
                }
            })
            .then(response => {
                // console.log('Move GET request response:', response);
                // console.log('before move response setState, new coords: ');
                // console.log('newX: ', this.state.newX);
                // console.log('newY: ', this.state.newY); 
                if (!response.data.error_msg) {
                    this.setState({
                        location: response.data.title,
                        description: response.data.description,
                        players: response.data.players,
                        currentX: this.state.newX,
                        currentY: this.state.newY,
                    });
                } else {
                    return console.log('You cannot go that way');
                }
               
                // console.log('after move response setState, current coords: ');
                // console.log('currentX: ', this.state.currentX);
                // console.log('currentY: ', this.state.currentY);
                if (this.state.coordsList.some( coords => coords['roomName'] === response.data.title)) {
                    console.log('Room is already in coordsList');
                } else {
                    this.state.coordsList.push({
                        roomName: this.state.location, 
                        roomX: this.state.currentX, 
                        roomY: this.state.currentY,
                    });
                }
                
                console.log('coordsList after move response: ', this.state.coordsList);
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
    };

    render() {
        return (
            <body>
                <div className='adv-console-container'>
                    <header className='console-header'>
                        <h2>{this.state.name}'s Adventure Console</h2>
                        <button onClick={this.handleLogout}>Log Out</button>
                    </header>
                    
                    <div className='console-main'>
                        {/* <p>Hello, {this.state.name}</p> */}
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

                        <div className='move-container'>
                            <h3>Move:</h3>
                            <div className='move-compass'>
                                <button className='north' value='n' onClick={this.handleMove}>North</button>
                                <button className='south' value='s' onClick={this.handleMove}>South</button>
                                <button className='east' value='e' onClick={this.handleMove}>East</button>
                                <button className='west' value='w' onClick={this.handleMove}>West</button>
                            </div>
                            <div className='minimap-container'>
                                {this.state.coordsList ? 
                                    <MiniMap coordsList={this.state.coordsList}/>
                                : null}
                            </div>
                        </div>

                        <div className='say-container'>
                            <h3>Say:</h3>
                            <input 
                                name='message' 
                                type='text'
                                placeholder='message to say' 
                                value={this.state.message} 
                                onChange={this.handleInputChange}
                            />
                            <button onClick={this.handleSaySubmit}>Say message</button>
                        </div>

                        <div className='messages-container'>
                            <h3>Messages:</h3>
                            {this.state.messages ? this.state.messages.map((m, i) => {
                                return (
                                    <div key={i}>
                                        {this.state.sayName} said: {m}
                                    </div>
                                )
                            }) : null}
                            <p>{this.state.moveDir}</p>
                        </div>

                    </div> 

                </div> 
            </body>
        );
    }
}

export default Adv;
