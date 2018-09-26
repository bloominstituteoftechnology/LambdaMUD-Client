import React, { Component } from 'react';
import axios from 'axios';
import './styling/Game.css';

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
        const key = sessionStorage.getItem('key')
        axios.get('https://lambda-mud-.herokuapp.com/api/adv/init/', {headers: {Authorization: `Token ${key}`}})
            .then(res => {
                const data = res.data
                this.setState({ uuid: data.uuid, name: data.name, title: data.title, description: data.description, players: data.players })
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div>
            <span> uuid: {this.state.uuid}</span>
            <span> name: {this.state.name}</span>
            <span> title: {this.state.title}</span>
            <span> description: {this.state.description}</span>
            <span> players: {this.state.players.map(player => {
            return <li key={Math.random()}>{player.name}</li>
            })}</span>
            </div>
        );
    }
}

export default Game;
