import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

const url = 'https://lambda-mud-app.herokuapp.com/api/adv/';

class Adventure extends Component {
    state = {
        name: '',
        title: '',
        description: '',
        players: [],
        error_msg: '',
        speak: '',
        direction: '',
        uuid: '',
        pusher_log: []
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    grabToken() {
        if(!localStorage.getItem('token')) {
            this.props.history.push('/login');
        }
        const auth_header = {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }
        return auth_header;
    }

    handleMove = (e) => {
        e.preventDefault()
        const dir_cmd = {
            "direction": this.state.direction
        }
        const auth_header = this.grabToken();
        console.log(dir_cmd)
        axios.post(`${url}move`, dir_cmd, auth_header)
        .then(response => {
            console.log(response)
            this.setState({
                name: response.data.name,
                title: response.data.title,
                description: response.data.description,
                players: response.data.players,
                direction: ''
            })
        })
        .catch(err => console.log(err))
    }

    handleSay = (e) => {
        e.preventDefault()
        const talk = {
            "message": this.state.speak
        }
        const auth_header = this.grabToken();
        console.log(talk)
        axios.post(`${url}say`, talk, auth_header)
        .then(response => {
            console.log(response, 'say response')
            // this.setState({
            //     name: response.data.name,
            //     title: response.data.title,
            //     description: response.data.description,
            //     players: response.data.players,
            //     direction: ''
            // })
        })
        .catch(err => console.log(err))
    }



    componentDidMount() {

        const auth_header = this.grabToken();

        axios.get(`${url}init`, auth_header)
        .then(response => {
            console.log(response.data);
            this.setState({
                name: response.data.name,
                title: response.data.title,
                description: response.data.description,
                players: response.data.players,
                uuid: response.data.uuid
            })
            var pusher = new Pusher('c3edd030826f53d270b3', {
                cluster: 'us2'
            });
            var channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
            channel.bind('broadcast', data => {
                const pusher_log = this.state.pusher_log.slice();
                pusher_log.push(data.message);
                this.setState({
                    pusher_log: pusher_log
                })
            })
        })
        .catch(err => console.log(err))

    }

    render() {
        return (
            <div>
                <h3>Where: {this.state.title}</h3>
                <h3>Surroundings: {this.state.description}</h3>
                <h3> Who else is there?
                    <ul>
                        {this.state.players.map(player => (
                        <li key={player} >{player} </li>
                        ))}
                    </ul>
                </h3>
                <h4>Activity: 
                    <ul>
                        {this.state.pusher_log.map(log => (
                        <li key={log} >{log} </li>
                        ))}
                    </ul>
                </h4>
                <form>
                    <label>Enter Direction (n, s, e, w)</label>
                    <input value={this.state.direction} placeholder='n/s/e/w' onChange={this.handleChange} name='direction' />
                    <button type='button' onClick={this.handleMove} >Move</button>

                    <label>Say something?</label>
                    <input value={this.state.speak} placeholder='message' onChange={this.handleChange} name='speak' />
                    <button type='button' onClick={this.handleSay} >Talk</button>
                </form>


            </div>
        )
    }
}

export default Adventure;