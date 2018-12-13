import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';

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
           saymessage: '',
           saidmessage: '',
           displaymessage: '',
           moveDir: '',
        };
    }

    componentDidMount() {
        console.log('ADV CDM')
        const token = localStorage['token'];
        console.log('Adv CDM, token in localStorage: ', localStorage['token']);
        axios
            .get('http://lambdamud-by-cameronsray.herokuapp.com/api/adv/init/', {
                headers: {
                    Authorization: `Token ${token}`,
                    // 'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log('Adv CDM GET response:, ', response);
                return this.setState(
                    {
                        uuid: response.data.uuid,
                        name: response.data.name,
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

    move = event => {
        event.preventDefault();
        console.log('Move function called');
        const token = localStorage['token'];
        const data = {
            'direction': event.target.value
        }
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

    render() {
        return (
            <div className='adv-console-container'>
                <h1>Adventure Console</h1>
                <p>Hello, {this.state.name}</p>
                <p>Your location: {this.state.location}</p>
                <p>{this.state.description}</p>

                <h3>Move:</h3>
                <button value='n' onClick={this.move}>North</button>
                <button value='s' onClick={this.move}>South</button>
                <button value='e' onClick={this.move}>East</button>
                <button value='w' onClick={this.move}>West</button>
            </div>
        );
    }
}

export default Adv;