import React, { Component } from 'react';
import axios from 'axios'
import Pusher from 'pusher-js';
import './Game.css';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: '',
            move: '',
            chats: [],
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('token')
        axios
            .get("https://lamb-mud.herokuapp.com/api/adv/init/",
                { headers: { "Authorization": `Token ${token}` } }
            )
            .then(response => {
                console.log(response.data)
                this.setState({ player: response.data })
            })
            .catch(err => console.log(err.response))
        Pusher.logToConsole = true;

        var pusher = new Pusher('2b56c12db70b782b19dd', {
            cluster: 'us2',
            forceTLS: true
        });

        var channel = pusher.subscribe('chat');
        channel.bind('message', function (data) {
            this.setState({ chats: [...this.state.chats, data], test: '' });
        });
    }

    handleInputChange = (e) => {
        return this.setState({ [e.target.name]: e.target.value });
    }

    playerMove = e => {
        e.preventDefault();
        if (this.state.move[0] === '/') {
            return this.playerTalk();
        }

        const token = localStorage.getItem('token')
        const data = { direction: this.state.move }
        axios
            .post("https://lamb-mud.herokuapp.com/api/adv/move/", data,
                {
                    headers: { "Authorization": `Token ${token}` }
                }
            )
            .then(response => {
                console.log(response.data)
                this.setState({ player: response.data, move: '' })
            })
            .catch(err => console.log(err.response))
    }

    playerTalk = e => {
        const token = localStorage.getItem('token')
        let newMove = this.state.move.split('');
        newMove.splice(0,1)
        
        const data = {
            username: this.state.player.name,
            message: newMove
        };
        axios
            .post("https://lamb-mud.herokuapp.com/api/adv/say/", data,
                {
                    headers: { "Authorization": `Token ${token}` }
                }
            )
            .then(response => {
                console.log(response.data)
                let chats = this.state.chats.slice();
                chats.push(response.data)
                this.setState({ chats, move: '' })
            })
            .catch(err => console.log(err.response))
    }

    render() {
        let players = this.state.player.players;
        return (
            <div className='game-ctn'>
                <div className='game-header'>Welcome, {this.state.player.name}</div>
                <div className='text-ctn'>
                    <div className='text-box'>
                        {this.state.player.title}
                        <br>
                        </br>
                        <br>
                        </br>
                        {this.state.player.description}
                        <br>
                        </br>
                        <br>
                        </br>
                        <p>Your are accompanied by: </p>
                        {players ?
                            players.map(player => <li className='players-list'>{player}</li>)
                            : null
                        }
                        <br>
                        </br>
                        <br>
                        </br>
                    {this.state.chats.length ?this.state.chats.map(chat => <div className='chat-msg'>{chat.name}: {chat.message}</div>) : null      }        
                        <br>
                        </br>
                        <p className='err-msg'>{this.state.player.error_msg !== '' ? this.state.player.error_msg : null}</p>
                    </div>
                </div>
                <form onSubmit={this.playerMove} className='input-ctn'>
                    <input
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="off"
                        type="text"
                        name="move"
                        value={this.state.move}
                        onChange={this.handleInputChange}
                        placeholder="Next move..."
                        className='input-box'
                    />
                    <button type="submit" className="submit-button" onSubmit={this.playerMove}>Send</button>
                </form>
            </div>
        )
    }
}

export default Game;