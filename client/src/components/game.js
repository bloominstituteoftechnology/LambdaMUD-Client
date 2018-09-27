import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Game extends Component {
    state = {
        player: {
            name: '',
            title: '',
            description: '',
            uuid: ''
        },
        input: ''
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
                this.setState({ player: response.data })
            }).catch(error => {
                console.error(error.response);
            })
    }
    render() {
        return (
            <div className="game-container">
                <div> {this.state.player.name}</div>
                <div> {this.state.player.title}</div>
                <div> {this.state.player.description}</div>

                <form onSubmit={this.submitHandler}>
                    <input
                        value={this.state.input}
                        onChange={this.inputChangeHandler}
                        type="text"
                        name="input"
                        placeholder="Enter command here" />
                    <button type="submit">
                        Enter
                    </button>
                </form>
            </div>
        );
    }

    inputChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value })
    };

    submitHandler = event => {
        event.preventDefault();
        const local = 'http://127.0.0.1:8000'
        const herokurl = 'https://kevintena-lambdamudbackend.herokuapp.com'
        let key = 'Token ' + localStorage.getItem('key')

        if (this.state.input.startsWith("move")) {
            const direction = this.state.input[5];
            console.log(direction);

            axios.post(`${local}/api/adv/move`,
                { "direction": direction },
                {
                    headers: {
                        "Authorization": key,
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                    this.setState({ player: response.data })
                })
        }
        else {
            console.log("Not a command");
        }
    };
}

export default Game;