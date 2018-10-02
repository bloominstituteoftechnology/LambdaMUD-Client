import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import './registration.css'

class Adventure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            name: '',
            description: '',
            players: [],
            uuid: ''
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
            })
    }

    handleLogout = () => {
        console.log('token in handleLogout ', localStorage.getItem('token'))
        localStorage.removeItem('token');
        console.log('success,', localStorage.getItem('token'))
    }

    render() {
        console.log('in render token: ', localStorage.getItem('token'))
        return (
            <div className='wrapper'>
                <div className='description'><b>Room: </b> {this.state.title}</div>
                <div className='description'><b>Description: </b> {this.state.description}</div>
                <div className='description'><b>Players: </b> {this.state.players.map(el => {
                    return el + ' '
                })}</div>
                <br>
                </br>
                <Button onClick={() => this.handleLogout()} >Logout</Button>
            </div>
        );
    }
}

export default Adventure;