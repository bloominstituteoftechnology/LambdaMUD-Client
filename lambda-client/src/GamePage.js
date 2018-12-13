import React from 'react';
import axios from 'axios';
import {Button} from 'reactstrap';
import Pusher from 'pusher-js';

class GamePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "",
            location: "",
            name: "",
            description: "",
            players: [],
            message: "",
            direction: "",
            title: ""
        }
        this.pusher = new Pusher('436e482763695bcaa9e9', {
            cluster: 'us2'
            
        });
    }

    changeHandle = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    componentDidMount() {
        const token = localStorage.getItem('token')
        console.log('token in CDM: ', token)
        axios
            .get('https://greb-lambdamud.herokuapp.com/api/adv/init', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(response => {
                console.log('response : ', response)
                this.setState({
                    title: response.data.title,
                    name: response.data.name,
                    description: response.data.description,
                    players: response.data.players,
                    uuid: response.data.uuid
                })
                this.pusher
                    .subscribe('p-channel-' + response.data.uuid)
                    .bind('broadcast', (data) => {
                        console.log('data: ', data)
                        // console.log('data: ', data.message)
                        this.setState({ direction: data.message })
                        this.state.messages.push(this.state.direction)
                    });
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleMove = (e) => {
        const token = localStorage.getItem('token')
        const path = {"direction": e.target.getAttribute('value')}
        console.log("path", path)
        axios.post('https://greb-lambdamud.herokuapp.com/api/adv/move/', path, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    Logout = () => {
        localStorage.removeItem('token');
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <div className='roomDetails'>Room: {this.state.title}</div>
                <div className='roomDetails'>Description: {this.state.description}</div>
                <h1>{this.state.name}, Where will you move?</h1>
                <div className="directions">
                    <Button onClick={this.handleMove} className='ns' value='n'>N</Button>
                    <Button onClick={this.handleMove} className='ns' value='s'>S</Button>
                    <Button onClick={this.handleMove} className='ew' value='e'>E</Button>
                    <Button onClick={this.handleMove} className='ew' value='w'>W</Button>
                </div>
                <br />
                <Button onClick={() => this.Logout()}> Logout </Button>
            </div>
        )
    }
}

export default GamePage;