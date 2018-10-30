import React from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

const pusher = new Pusher('990ddef61491c8ebceb4', {
    cluster: 'us2'
})

const channel = pusher.subscribe('game-channel')

class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            input: '',
            name: '',
            movesLog: []
        }
    }

    componentDidMount = () => {
        const token = localStorage.getItem('token');
        axios.get('https://lambdamud-ghr.herokuapp.com/api/adv/init/', {headers: {Authorization: `Token ${token}`}})
        .then(response => {
            console.log(response)
            this.setState({
                name: response.data.name,
                movesLog: [{
                    title: response.data.title,
                    description: response.data.description,
                    players: response.data.players,
                }]
            })
        })
        channel.bind('game-channel', data => {
            this.setState({movesLog: [...this.state.movesLog, data]})
        })
    }

    parseCommand = (event) => {
        event.preventDefault();
        if (this.state.input.toLowerCase() === 'n' || this.state.input.toLowerCase() === 'north') {
            this.handleMove('n')
        } else if (this.state.input.toLowerCase() === 's' || this.state.input.toLowerCase() === 'south') {
            this.handleMove('s')
        } else if (this.state.input.toLowerCase() === 'e' || this.state.input.toLowerCase() ==='east') {
            this.handleMove('e')
        } else if (this.state.input.toLowerCase() === 'w' || this.state.input.toLowerCase() === 'west') {
            this.handleMove('w')
        }
    }

    handleMove = (direction) => {
        const token = localStorage.getItem('token');
        const headers = {
            "Authorization": `Token ${token}`, 
            "Content-Type": "application/json"
        }
        const data = {
            "direction": direction
        }
        axios.post('https://lambdamud-ghr.herokuapp.com/api/adv/move/', data, {headers: headers})
        .then(response => {
            console.log('handlemove', response)
            this.setState({
                movesLog: [...this.state.movesLog, {
                    title: response.data.title,
                    description: response.data.description,
                    players: response.data.players,
                }]
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render () {
        const history = this.state.movesLog.slice().reverse();
        return (
            <div>
                <div className="gameBox">
                <p>Welcome, {this.state.name}</p>
                <div className="printList">
                    {history.map(move => 
                    <div>
                        <h4>{move.title}</h4>
                        <p>{move.description}</p>
                        <p>Players: {move.players.join(', ')}</p>
                    </div>
                    )}
                </div>
                <form onSubmit={this.parseCommand}>
                    <input type="text" 
                    name="input" 
                    value={this.state.input} 
                    placeholder="Type a direction or command or message here." 
                    onChange={this.changeHandler} 
                    className="gameInput"/>
                    <button type="submit">Submit</button>
                </form>
                </div>

            </div>
        )
    }
}

export default Game;