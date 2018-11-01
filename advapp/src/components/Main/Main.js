import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

import './Main.css';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            title: '',
            description: '',
            command: '',
            direction: '',
            messages: '',
            message:[],
            userUUID: '',
            chat: '',
            loggedin: true,
        }
    }

    componentDidMount() {
        if(!localStorage.getItem('token')) {
            this.setState({
                loggedin: false
            });
            this.props.history.push('/login');
        }
        const header = {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        }
        axios
        .get('https://advbackend.herokuapp.com/api/adv/init/', header)
        .then( response => {
        console.log(response)
        this.setState({ 
            username: response.data.name,
            title: response.data.title,
            description: response.data.description,
            userUUID: response.data.uuid })

            const pusher = new Pusher('22da2669af3aa0dc8432', { cluster: 'us2' })
            const channel = pusher.subscribe("p-channel-" + response.data.uuid)

            channel.bind('broadcast', response => {
                console.log(response)
                this.setState({
                    message: [...this.state.message, response]
                })
            })
        })
        .catch(error => console.log(error))
    }

    submitCommand = event => {
        const { direction } = this.state;
        event.preventDefault();
        const header = {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        };
        console.log(direction, 'direction')
        if (direction === "n" || direction === "s" || direction === "w" || direction === "e") {
            axios
            .post('https://advbackend.herokuapp.com/api/adv/move/',{direction}, header)
            .then(response => {
                this.setState({
                    username: response.data.name,
                    title: response.data.title,
                    description: response.data.description,
                    direction: '',
                    messages: `You moved "${direction}". You are in the ${response.data.title}.`,
                });
            })
            .catch(err => console.log(err))
        }
        else {
            axios
            .post('https://advbackend.herokuapp.com/api/adv/say/', {message: this.state.direction}, header)
            .then(response => {
                this.setState({
                    direction: '',
                })
            })
            .catch(e => console.log(e))
        }
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <form className="game-window" onSubmit={this.submitCommand}>
                <div className="game-card">
                    <div className="game-output">
                        <span><b>Room: {this.state.title}</b></span><br/><br/>
                        <span>{this.state.description}</span>
                    </div>
                    <h5 className="game-chat-title">LOGS:</h5>
                    <h5 className="game-chat">
                        {this.state.message.map(i => (
                            <li>>>{i.message}</li>
                        ))}
                    </h5>
                    <h5 className="game-message">
                        >>Message: {this.state.messages}
                    </h5>
                    <h5 className="game-command">
                        >>Command: {this.state.direction}
                    </h5>
                    <input 
                        type="text" 
                        placeholder="What do you want to do?"
                        name="direction"
                        value={this.state.direction}
                        onChange={this.handleChange}/>
                    <button type="submit">Send</button>
                </div>
            </form>
        )
    }
}

export default Main;