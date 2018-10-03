import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import './registration.css';
import Pusher from 'pusher-js';

var pusher = new Pusher('5309daa31db0b9c7f6a6', {
    cluster: 'us2',
    forceTLS: true
});

class Adventure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            name: '',
            description: '',
            players: [],
            uuid: '',
            error_msg: '',
        }
    }



    componentDidMount() {
        const token = localStorage.getItem('token')
        console.log('token in CDM: ', token)
        axios
            .get('https://adventure-mud.herokuapp.com/api/adv/init', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(r => {
                console.log('r : ', r)
                this.setState({
                    title: r.data.title,
                    name: r.data.name,
                    description: r.data.description,
                    players: r.data.players,
                    uuid: r.data.uuid
                })
                var channel = pusher.subscribe('my-channel');
                channel.bind('my-event', function (data) {
                    console.log('pusher data: ', JSON.stringify(data));
                });
            })
    }

    handleMove = e => {
        const token = localStorage.getItem('token')
        const path = { "direction": e.target.getAttribute('value') }
        console.log(path)
        axios
            .post('https://adventure-mud.herokuapp.com/api/adv/move', path, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(r => {
                console.log(r)
                this.setState({
                    title: r.data.title,
                    name: r.data.name,
                    description: r.data.description,
                    players: r.data.players,
                    error_msg: r.data.error_msg
                })
            })

    }

    handleLogout = () => {
        console.log('token in handleLogout ', localStorage.getItem('token'))
        localStorage.removeItem('token');
        console.log('success,', localStorage.getItem('token'))
        this.props.history.push('/')
    }

    render() {
        console.log('in render token: ', localStorage.getItem('token'))
        return (
            <div className='wrapper'>
                <div className='description'><b>Room: </b> {this.state.title}</div>
                <div className='description'><b>Description: </b> {this.state.description}</div>
                <div className='description'><b>Players online: </b> {this.state.players.map(el => {
                    return el + ' '
                })}</div>
                <h3>Where do you go?</h3>
                <div className='dirArea'>
                    <Button onClick={this.handleMove} className='dirLong' value='n'>N</Button>
                    <Button onClick={this.handleMove} className='dirShort' value='w'>W</Button>
                    <Button onClick={this.handleMove} className='dirShort' value='e'>E</Button>
                    <Button onClick={this.handleMove} className='dirLong' value='s'>S</Button>
                </div>
                <div className='errMess'>
                    <p>{this.state.error_msg}</p>
                </div>
                <br>
                </br>
                <Button onClick={() => this.handleLogout()} >Logout</Button>
            </div>
        );
    }
}

export default Adventure;