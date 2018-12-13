import React from 'react';
import axios from 'axios';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import Pusher from 'pusher-js';
import {Link} from 'react-router-dom';
import "./GamePage.css";

class GamePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "",
            location: "",
            name: "",
            description: "",
            players: [],
            error_msg: "",
            message: "",
            messages: [],
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
                        this.setState({ direction: data.message })
                        this.state.messages.push(this.state.direction)
                    });
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleSay = () => {
        const token = localStorage.getItem('token')
        const message = {'message': this.state.message}
        this.state.messages.push(this.state.message)
        axios.post('https://greb-lambdamud.herokuapp.com/api/adv/say', message, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            console.log('say: ', response.data)
            this.setState({ message: ""})
        })
        .catch(err => {
            console.log(err)
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
            this.setState({
                    title: response.data.title,
                    name: response.data.name,
                    description: response.data.description,
                    players: response.data.players,
                    error_msg: response.data.error_msg
            })
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
            <div className="gameBoard">
                <div className="chat">
                    {this.state.messages ? this.state.messages.map((message, i) => {
                                return (
                                    <div key={i}>
                                        {this.state.name}: {message}
                                    </div>
                                )
                            }) : null}
                            <p>{this.state.direction}</p>
                </div>
                <Form>
                    <FormGroup>
                        <Input
                            type="text"
                            placeholder="enter message"
                            name="message"
                            value={this.state.message}
                            onChange={this.changeHandle}
                            id="say"
                        />
                    </FormGroup>
                </Form>
                <Button className="msg_btn" onClick={() => this.handleSay()}>Send Message</Button>
                <div className='roomDetails'>Room: {this.state.title}</div>
                <div className='roomDetails'>Description: {this.state.description}</div>
                <h1>{this.state.name}, Where will you move?</h1>
                <div className="directions">
                    <Button onClick={this.handleMove} className='nsew' value='n'>N</Button>
                    <Button onClick={this.handleMove} className='nsew' value='s'>S</Button>
                    <Button onClick={this.handleMove} className='nsew' value='e'>E</Button>
                    <Button onClick={this.handleMove} className='nsew' value='w'>W</Button>
                </div>
                <div className="error_msg">
                    <p>{this.state.error_msg}</p>
                </div>
                <div className="myPlayers">
                    Players: {this.state.players.map((p, i) => {
                        return <p>players in room={i+1}>{p}</p>
                    })}
                </div>
                <br />
                <Link to='/'><Button className="home">Home</Button></Link>
                <Button className="logout" onClick={() => this.Logout()}> Logout </Button>
            </div>
        )
    }
}

export default GamePage;