import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

class Game extends Component {
    state = {
        name:"",
        title:"",
        description:"",
        players:[],
        chat:"",
        uuid:"",
        direction:"",
        store:""
    }
    
    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleMoveChange = event => {
        event.preventDefault()

        const directions =  {
            'direction': this.state.direction
        }
        if (!localStorage.getItem('token')) {
            console.log("Not A Valid Login.");
        }
        const player_authorization = {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }
        axios.post('https://lmabdamudmok.herokuapp.com/api/adv/move/', directions, player_authorization)
            .then(res => {
                console.log(res.data);
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    name: res.data.name,
                    players: res.data.players,
                    direction: "",
                    store: []
                })
            })
        }
    handleSayChange = event => {
        event.preventDefault()

        const player_say = {
            'message': this.state.chat
        }
        if (!localStorage.getItem('token')) {
            console.log('Please login first.')
        }
        const player_authorization = {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }
        axios.post('https://lmabdamudmok.herokuapp.com/api/adv/say/', player_say, player_authorization)
            .then(res => {
                this.setState({ chat: "", res })
            })
            .catch(err => {
                console.log('error in say', err)
            })
    }
    componentDidMount() {
        if (!localStorage.getItem('token')) {
            console.log('Please login first.');
        }
        const player_authorization = {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }
        axios.get('https://lmabdamudmok.herokuapp.com/api/adv/init/', player_authorization)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    decription: res.data.description,
                    name: res.data.name,
                    players: res.data.players,
                    uuid: res.data.uuid
                })
                var pusher = new Pusher('1d864511b538b298cf80', {
                    cluster: 'us2',
                    forceTLS: true
                });
                var channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
                channel.bind('broadcast', data =>{
                    const log = this.state.log.slice();
                    log.push(data.message);
                    this.setState({
                        log: log
                    })
                });
            })
        }
    render() {
        return (
            <div>
                <div>
                    <div>
                        <h2>{this.state.name}</h2>
                    </div>
                    <div>
                        <h3>{this.state.title}</h3>
                        <p>{this.state.description}</p>
                    </div>
                    <div>
                        <h3>In the room with you is...</h3>
                        {this.state.players.map((name, id) => (
                            <p key={id}>{name}</p>
                        ))}
                    </div>
                </div> 
                {/* <div>
                    <h3>Chit Chat</h3>
                    {this.state.log.map(logs => (
                        <p key={logs}>{logs}</p>
                    ))}
                </div> */}
                <div>
                    <form>
                        <h3>Which way will you go? N, S, E, W?</h3>
                        <input name="directions" placeholder="nsew" value={this.state.direction} onChange={this.handleInputChange} />
                        <button type="button" onClick={this.handleMoveChange}>Onwards!</button>
                    </form>
                    <form>
                        <input name="chat" placeholder="what's on your mind?" value={this.state.chat} onChange={this.handleInputChange} />
                        <button type="button" onClick={this.handleSayChange}>Speak!</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Game;