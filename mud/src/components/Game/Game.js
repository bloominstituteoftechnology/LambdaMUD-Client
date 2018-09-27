import React, { Component } from 'react';
import axios from 'axios'
import './Game.css'
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

    }

    handleInputChange = (e) => {
        return this.setState({ [e.target.name]: e.target.value });
    }

    playerMove = e => {
        e.preventDefault();
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

    render() {
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