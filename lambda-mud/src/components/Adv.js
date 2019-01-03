// This file contains everything for the Adventure console, where users interact with the game

import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import '../styles/Adv.css'
import MiniMap from './MiniMap';
import styled from 'styled-components';
import Messages from './Messages';
// import SayInput from './SayInput';
import MoveCompass from './MoveCompass';

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
           mapLength: 201,
            roomLength: 27.7,
        };
        // define the connection to the pusher app used to send messages and broadcast between players
        this.pusher = new Pusher('bfb05bd9647c3539a67d', {
            cluster: 'us2',
            forceTLS: true
        });
    }

    componentWillMount() {
        console.log('ADV CDM called');
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
                let xPosition = (this.state.mapLength / 2) + (this.state.currentX * this.state.roomLength) - (this.state.roomLength / 2);
                let yPosition = (this.state.mapLength / 2) + (this.state.currentY * this.state.roomLength) - (this.state.roomLength / 2);
                let newCoordsList = this.state.coordsList.concat({
                    roomName: this.state.location, 
                    roomX: this.state.currentX, 
                    roomY: this.state.currentY,
                    xPosition: xPosition,
                    yPosition: yPosition,
                });
                this.setState({ coordsList: newCoordsList });
                console.log('ADV CDM coordsList: ', this.state.coordsList);
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
        console.log('********** handleMove called **********');
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

        axios
            .post('http://lambdamud-by-cameronsray.herokuapp.com/api/adv/move/', data, {
                headers: {
                    Authorization: `Token ${token}`,
                    // 'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (!response.data.error_msg) {
                    
                    if (this.state.coordsList.some( coords => coords['roomName'] === response.data.title)) {
                        console.log('Room is already in coordsList');
                        this.setState({
                            location: response.data.title,
                            description: response.data.description,
                            players: response.data.players,
                            currentX: this.state.newX,
                            currentY: this.state.newY,
                        });
                    } else {
                        let xPosition = (this.state.mapLength / 2) + (this.state.newX * this.state.roomLength) - (this.state.roomLength / 2);
                        let yPosition = (this.state.mapLength / 2) + (this.state.newY * this.state.roomLength) - (this.state.roomLength / 2);
                        let newCoordsList = this.state.coordsList.concat({
                            roomName: response.data.title, 
                            roomX: this.state.newX, 
                            roomY: this.state.newY,
                            xPosition: xPosition,
                            yPosition: yPosition,
                        });
                        this.setState({
                            location: response.data.title,
                            description: response.data.description,
                            players: response.data.players,
                            currentX: this.state.newX,
                            currentY: this.state.newY,
                            coordsList: newCoordsList,
                        });
                    }
            
                } else {
                    return console.log('You cannot go that way');
                }
               
                
                
            })
            .catch(err => {
                console.log(err.response);
            })
    }
   
    // Update state values with form input values:
    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSaySubmit = event => {
        const token = localStorage['token'];
        const data = {'message': this.state.message};
        // console.log('Say data to post: ', data);
        this.state.messages.push(this.state.message)
        axios
            .post('http://lambdamud-by-cameronsray.herokuapp.com/api/adv/say/', data, {
                headers: {
                    Authorization: `Token ${token}`,
                    // 'Content-Type': 'application/json',
                }
            })
            .then(response => {
                // console.log('Say response: ', response);
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
                        <h2>{this.state.name}'s Console</h2>
                        <button onClick={this.handleLogout}>Log Out</button>
                    </header>
                    
                    <div className='console-main'>
                        <p>Your location: {this.state.location}</p>
                        <p>{this.state.description}</p>
                        <p>Other players in this room:</p>
                        {this.state.players ? this.state.players.map((p, i) => {
                            return (
                                <div key={i}>
                                    {p}
                                </div>
                            )
                        }) : null }

                        <div className='move-container'>
                            <h3>Move:</h3>
                            <MoveCompass handleMove={this.handleMove}></MoveCompass>
                            <div className='minimap-container'>
                                <MiniMap 
                                    coordsList={this.state.coordsList} 
                                    currentRoom={this.state.name}>
                                </MiniMap>
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
                            <Messages 
                                messages={this.state.messages} 
                                sayName={this.state.sayName} 
                                moveDir={this.state.moveDir}>
                            </Messages>
                        </div>

                    </div> 

                </div> 
            </body>
        );
    }
}

export default Adv;
