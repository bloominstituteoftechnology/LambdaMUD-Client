import React, { Component } from 'react';
import Console from './Console';
import Input from './Input';
import axios from 'axios';
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
                    console.log(response.data)
                    const rooms = this.state.rooms
                    rooms.push(response.data)
                    this.setState({ rooms, uuid: response.data.uuid })
                })
                .catch(error => console.log(`Login: ${error}`))
        }
    }
    handleMove = (direction) => {
        console.log(`Direction: ${direction}`)
        const token = sessionStorage.getItem('token')
        const header = {headers: { Authorization: `Token ${token}` }}
        const body = { direction: direction}
        axios.post('https://lam-mud.herokuapp.com/api/adv/move/', body, header)
                .then(response => {
                    const rooms = this.state.rooms
                    rooms.push(response.data)
                    this.setState({ rooms })
                })
                .catch(error => console.log(`Login: ${error}`))
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