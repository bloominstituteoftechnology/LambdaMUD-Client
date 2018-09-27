import React, { Component } from 'react';
import axios from 'axios';

class Game extends Component {
    constructor() {
        super();
        this.state = { 
            messageBoard: [],
            gameInput: '',
            token: '',
            URL: 'https://vtwo-tristan-lambda-mud.herokuapp.com/api/',
            serverGameInfo: '',
            description: '',
            name: '',
            players: [],
            title: '',
            uuid: '',
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('auth');  
        this.axiosInit(token);
    }
    render() {
        return(
            <div className="game">
                <h1>GAME</h1>
                <div className="game-message-board">
                    {this.state.messageBoard}
                </div>
                <div className="game-input-wrapper">
                    <form action="" className="game-form">
                        <input 
                            type="text" 
                            className="game-input-field"
                            placeholder="Enter Command..."
                            name="gameInput"
                            value={this.state.gameInput}
                            onChange={this.handleGameInputChange}
                        />
                        <button className="game-input-button" onSubmit={this.handleGameInputSubmit}>Send</button>
                    </form>
                </div>
            </div>
        )
    }
    axiosInit = (token) => {
        const req = {
            headers: { Authorization: token }
        }
        axios
            .get(`${this.state.URL}adv/init`, req)
            .then(res => {
                console.log('res from init', res);
                let messageBoard = this.state.messageBoard.slice();
                messageBoard.push(res.data.description);
                this.setState({ 
                    description: res.data.description,
                    name: res.data.name,
                    players: res.data.players,
                    title: res.data.title,
                    uuid: res.data.uuid,
                    messageBoard: messageBoard,
                    token:token
                })
                return res;
            })
            .catch(error => {
                console.log(error);
                alert(error);
            })
    }
    handleGameInputChange = (e) => {
        this.setState({ gameInput: e.target.value })
    }
    handleGameInputSubmit = (e) => {
        e.preventDefault();
        this.axiosMove();
    }
    axiosMove = () => {

        const req = {
            headers: { Authorization: this.state.token },
            direction: this.state.gameInput
        }
        axios
            .post(`${this.state.URL}adv/move`, req)
            .then(res => {
                console.log('res from move', res)
                let messageBoard = this.state.messageBoard.slice();
                messageBoard.push(res.data.description);
                window.location.reload();
            })
            .catch(err => {console.log(err); alert(err)})
    }
}
export default Game;