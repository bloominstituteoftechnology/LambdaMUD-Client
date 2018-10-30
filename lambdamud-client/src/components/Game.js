import React, { Component } from 'react';
import axios from 'axios';
class Game extends Component {
    state = {
        player: {
            name: '',
            title: '',
            description: '',
            uuid: ''
        }
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
    render() {
        return (
            <div className="game">
                <div> {this.state.player.name}</div>
                <div> {this.state.player.title}</div>
                <div> {this.state.player.description}</div>
                <input
                    type="text"
                    placeholder="Enter command here" />
            </div>
        );
    }
    inputChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value })
    };
    submitHandler = event => {
        event.preventDefault();
        const herokuUrl = 'https://jenniferplayer-lambdamud.herokuapp.com'
        axios.post(`${herokuUrl}/api/registration`, this.state).then(res => {
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