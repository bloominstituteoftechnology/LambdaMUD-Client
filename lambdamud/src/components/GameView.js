import React, { Component } from 'react';
import axios from 'axios';



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
        const key = localStorage.getItem('key')
        axios.get('https://mylambdamud-project.herokuapp.com/api/adv/init/', {headers: {Authorization: `Token ${key}`}})
            .then(res => {
                const data = res.data
                this.setState({ uuid: data.uuid, name: data.name, title: data.title, description: data.description, players: data.players })
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div>
            <p> uuid: {this.state.uuid}</p>
            <p> name: {this.state.name}</p>
            <p> title: {this.state.title}</p>
            <p> description: {this.state.description}</p>
            <p> players: {this.state.players.map(player => {
            return <li key={Math.random()}>{player.name}</li>
            })}</p>
            </div>
        );
    }
}

export default Game;
