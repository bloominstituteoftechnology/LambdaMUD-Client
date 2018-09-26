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
            name: '',
            title: '',
            description: '',
            players: [],
        }
    }
    componentDidMount() {
        if (sessionStorage.getItem('token')) {
            const token = sessionStorage.getItem('token')
            axios.get('https://lam-mud.herokuapp.com/api/adv/init/', {headers: { Authorization: `Token ${token}` }})
                .then(response => {
                    const data = response.data
                    this.setState({ uuid: data.uuid, name: data.name, title: data.title, description: data.description, players: data.players,})
                })
                .catch(error => console.log(`Login: ${error}`))
        } else {alert('You must be logged in to play.')}
    }
    render() { 
        return (
            <div className='Game'>
                <h1 className='title'>Adventure - Game View</h1>
                <Console />
                <Input />
            </div>
        );
    }
}
 
export default Game;