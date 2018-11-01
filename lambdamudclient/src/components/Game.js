import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

const url = 'https://lambdamud-fred-sohn.herokuapp.com/api/adv/'

class Game extends Component {
    state = {

    }
    
    componentDidMount() {
        const token = localStorage.getItem('Token')
        console.log('token: ',token)
        const options = {
            headers: {
                Authorization:`Token ${token}`
            }
        }
        console.log('options:', options)
        axios.get(`${url}init`, options)
        .then(res => {
            console.log('res: ', res)
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <p>You are currently in room:</p>
                <p>In this room, you see these players: </p>
            </div>
        );
    }
}

export default Game