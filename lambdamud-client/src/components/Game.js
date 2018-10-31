import React from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';


class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            input: '',
            name: '',
            movesLog: [],
            uuid: null,
            channelSubbed: false
        }
        this.channel = null;
        
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
                }],
                uuid: response.data.uuid
            })
            const pusher = new Pusher('990ddef61491c8ebceb4', {
                cluster: 'us2'
            })
            if (this.state.uuid) {
                this.channel = pusher.subscribe(`p-channel-${this.state.uuid}`, this.state.uuid);
            }
            this.setState({channelSubbed: true})
            if (this.state.channelSubbed) {
                this.channel.bind('broadcast', data => {
                    this.setState({movesLog: [...this.state.movesLog, {message: data.message}]}
                )})
            }
            
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
        } else {
            this.handleSay(this.state.input)
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

    handleSay = (message) => {
        const token = localStorage.getItem('token');
        const headers = {
            "Authorization": `Token ${token}`, 
            "Content-Type": "application/json"
        }
        const data = {
            "message": message
        }
        axios.post('https://lambdamud-ghr.herokuapp.com/api/adv/say/', data, {headers: headers})
        .then(response => {
            console.log('handlemove', response)
            this.setState({
                movesLog: [...this.state.movesLog, {
                    message: response.data.message
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
        console.log('channel', this.channel)
        

        console.log("movesLog", this.state.movesLog)
        const history = this.state.movesLog.slice().reverse();
        return (
            <div>
                <div className="gameBox">
                <p>Welcome, {this.state.name}</p>
                <div className="printList">
                    {history.map(move => 
                    <div>
                        {move.title ? <h4>{move.title}</h4> : ''}
                        {move.description ? <p>{move.description}</p> : ''}
                        {move.players ? <p>Players: {move.players.join(', ')}</p> : ''}
                        {move.message ? <p>{move.message}</p> : ''}
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