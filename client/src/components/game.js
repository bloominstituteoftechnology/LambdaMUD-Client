import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Game extends Component {
    state= {
        player: {
            name:'',
            title:'',
            description: '',
            uuid: ''
        }
    }
    componentDidMount() {
        let key = 'Token ' + localStorage.getItem('key')
        const local = 'http://127.0.0.1:8000'
        const herokurl = 'https://kevintena-lambdamudbackend.herokuapp.com'
        axios.get(`${local}/api/adv/init`, {
            headers: {
                "Authorization": key
            }
        })
        .then(response => {
            this.setState({player: response.data})
        })
    }
    render() {
        return (
            <div className="game-container">
                <div> {this.state.player.name}</div>
                <div> {this.state.player.title}</div>
                <div> {this.state.player.description}</div>
                <div> {this.state.player.uuid}</div>

                <input
                    type="text"
                    placeholder="Enter command here"/>
            </div>
        );
    }

    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    submitHandler = event => {
        event.preventDefault();
        const local = 'http://127.0.0.1:8000'
        const herokurl = 'https://kevintena-lambdamudbackend.herokuapp.com'
        axios.post(`${local}/api/registration`, this.state).then(res => {
            console.log(res.data);
            const token = res.data.key;

            localStorage.setItem('key', token);

        })
        .catch(err => {
            console.error(err.response);
        });

        console.log('state', this.state);
    };
}

export default Game;