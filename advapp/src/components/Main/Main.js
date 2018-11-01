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
                this.state.message.push(response)
                console.log(this.state.message)
            })
        })
        .catch(e => console.log(e))
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    submitCommand = event => {
        const { direction } = this.state;
        event.preventDefault();
        const header = {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        };

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
        else if (direction !== "n" || direction !== "s" || direction !== "w" || direction !== "e") {
            axios
            .post('https://advbackend.herokuapp.com/api/adv/say/', { message: this.state.chat }, header)
            .then(response => {
                this.setState({
                    chat: '',
                })
            })
        }
        else {
            console.log("Not a valid command!")
            this.setState({
                messages: "Not a valid command!"
            })
        }
    };

    sendMessage = event => {
        event.preventDefault();
        const header = {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        }
        axios
        .post('https://advbackend.herokuapp.com/api/adv/say/', { message: this.state.chat }, header)
        .then(response => {
            this.setState({
                chat: '',
            })
        })
        .catch(e => console.log(e))
    }

    render() {
        return (
            <div>
            <form className="game-window" onSubmit={this.submitCommand}>
                <div className="game-card">
                    <div className="game-output">
                        <span><b>Room: {this.state.title}</b></span><br/><br/>
                        <span>{this.state.description}</span>
                    </div>
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

            <form className="message-card" onSubmit={this.sendMessage}>
                <h5 className="message-chat" id="chat-div">
                    {this.state.message.map(i => (
                        <li>>> {i.message}</li>
                    ))}
                </h5>
                <div className="message-bottom">
                    <input 
                        type="text"
                        placeholder="Say something!"
                        name="chat"
                        value={this.state.chat}
                        onChange={this.handleChange}/>
                    <button type="submit">Chat</button>
                </div>
            </form> 
            </div>
        )
    }
}

export default Main;