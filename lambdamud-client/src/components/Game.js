import React, { Component } from 'react';
import axios from 'axios';
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
        const herokuUrl = 'https://jenniferplayer-lambdamud.herokuapp.com'
        axios.get(`${herokuUrl}/api/adv/init`, {
            headers: {
                "Authorization": key
            }
        })
            .then(response => {
                this.setState({ player: response.data })
            })
            .catch(error => {
                console.log(error.response)
            })
    }
    inputChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value })
    };
    submitHandler = event => {
        if (this.state.input.startsWith('n') || this.state.input.startsWith('e') || this.state.input.startsWith('s') || this.state.input.startsWith('w')) {
            this.handleMove(event)
        }
    };
    handleMove = event => {
        event.preventDefault();
        const herokuUrl = 'https://jenniferplayer-lambdamud.herokuapp.com'
        let key = 'Token ' + localStorage.getItem('key')
        const direction = this.state.input[0];

        axios.post(`${herokuUrl}/api/adv/move`,
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
    render() {
        return (
            <div className="game">
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
}
export default Game; 