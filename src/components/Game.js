import React, { Component } from 'react';
import Console from './Console';
import Input from './Input';
import axios from 'axios';
import Pusher from 'pusher-js';
import '../styles/Game.css';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: '',
            rooms: []
        }
    }
    componentDidMount() {
        const token = sessionStorage.getItem('token')
        if (token) {
            axios.get('https://lam-mud.herokuapp.com/api/adv/init/', {headers: { Authorization: `Token ${token}` }})
                .then(response => {
                    const rooms = this.state.rooms
                    rooms.push(response.data)
                    this.setState({ rooms, uuid: response.data.uuid })
                    let channel = pusher.subscribe('p-channel-' + response.data.uuid);
                    channel.bind('broadcast', data => {
                    this.setState({ rooms: [...this.state.rooms, data] });
        });
                })
                .catch(error => console.log(`Login: ${error}`))
        }
        const pusher = new Pusher('93535f5176522c04b743', {
            cluster: 'us2',
            encrypted: true
        });
        
    }
    handleMove = (direction) => {
        const token = sessionStorage.getItem('token')
        const header = {headers: { Authorization: `Token ${token}` }}
        const body = { direction: direction}
        const input = direction.split(' ');
        if (input[0] === 'say') {
            this.handleSay(header, input);
            return;
        }
        axios.post('https://lam-mud.herokuapp.com/api/adv/move/', body, header)
                .then(response => {
                    const rooms = this.state.rooms
                    rooms.push(response.data)
                    this.setState({ rooms })
                })
                .catch(error => console.log(`Login: ${error}`))
    }
    handleSay = (header, input) => {
        input.shift();
        input = input.join(' ');
        const message = { 'message': input };
        axios
            .post('https://lam-mud.herokuapp.com/api/adv/say/', message, header)
            .then(response => {
                const rooms = this.state.rooms
                rooms.push(response.data.message)
                this.setState({ rooms });
            })
            .catch(err => console.log(err.response));
    }
    render() { 
        return (
            <div className='Game'>
                <h1 className='title'>Adventure - Game View</h1>
                <Console rooms={this.state.rooms} />
                <Input handleMove={this.handleMove} />
            </div>
        );
    }
}
 
export default Game;