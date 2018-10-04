import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './registration.css';
import Pusher from 'pusher-js';

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
            message: '',
            messages: [],
            direction: '',
        }
        this.pusher = new Pusher('5309daa31db0b9c7f6a6', {
            cluster: 'us2'
            // forceTLS: true
        });
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
                this.pusher
                    .subscribe('p-channel-' + r.data.uuid)
                    .bind('broadcast', (data) => {
                        console.log('data: ', data)
                        // console.log('data: ', data.message)
                        this.setState({ direction: data.message })
                        this.state.messages.push(this.state.direction)
                    });
            })
            .catch(err => console.log(err.response))
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

    handleChange = e => {
        this.setState({ message: e.target.value })
    }

    handleSay = (e) => {
        const token = localStorage.getItem('token')
        const message = { 'message': this.state.message }
        this.state.messages.push(this.state.message)
        axios
            .post('https://adventure-mud.herokuapp.com/api/adv/say', message, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(r => {
                console.log('say data: ', r.data)
                this.setState({ message: '' })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleLogout = () => {
        localStorage.removeItem('token');
        this.props.history.push('/')
    }

    render() {
        return (
            <div className='advArea'>
                <div className="chatBox">
                    <div className='inputArea'>
                        <div>
                            {this.state.messages ? this.state.messages.map((m, i) => {
                                return (
                                    <div key={i}>
                                        {this.state.name}: {m}
                                    </div>
                                )
                            }) : null}
                            <p>{this.state.direction}</p>
                        </div>
                        <input type="text" name="message" value={this.state.message} id="say" onChange={this.handleChange}></input>
                        <Button onClick={() => this.handleSay()}>Send</Button>
                    </div>
                </div>

                <div className='wrapper'>
                    <div className='description'><span className='alignLift'><b>Room: </b></span> {this.state.title}</div>
                    <div className='description'><span className='alignLift'><b>Description: </b></span>{this.state.description}</div>
                    <br></br>
                    <h4 className='alignLift'>{this.state.name}, choose your direction</h4>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className='dirAndErr'>
                        <div className='dirArea'>
                            <Button onClick={this.handleMove} className='dirLong' value='n'>N</Button>
                            <Button onClick={this.handleMove} className='dirShort' value='w'>W</Button>
                            <Button onClick={this.handleMove} className='dirShort' value='e'>E</Button>
                            <Button onClick={this.handleMove} className='dirLong' value='s'>S</Button>
                        </div>
                        <div className='errMess'>
                            <p>{this.state.error_msg}</p>
                        </div>
                        <div className='players'>
                            <div className='description'><b>Players: </b> <div>{this.state.players.map((el, i) => {
                                return <p key={i}>{el}</p>
                            })}</div>
                            </div>
                        </div>
                    </div>
                    <br>
                    </br>
                    <br>
                    </br>
                    <Link to='/'><Button className='homeButton'>Home</Button></Link>
                    <Button onClick={() => this.handleLogout()} >Logout</Button>
                </div>
            </div>
        );
    }
}

export default Adventure;