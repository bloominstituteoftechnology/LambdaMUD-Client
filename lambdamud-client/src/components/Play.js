import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import Pusher from 'pusher-js';
import { FormGroup, Form, Col, Label, Input, Button } from 'reactstrap';

class Play extends Component {

    state = {
        name: '',
        title: '',
        description: '',
        players: [],
        error_msg: '',
        chat: '',
        uuid: '',
        direction: '',
        messages: [],
        rooms: []
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    movePlayer = (e) => {
        e.preventDefault()
        
        if (!localStorage.getItem('token')) {
            console.log("User not logged in. Redirecting...")
            this.props.history.push('/login')
        }
        
        const direction = {
            'direction': this.state.direction
        }
        
        fetch("http://localhost:8000/api/adv/move/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(direction)
        })
        .then(response => response.json())
        .then(response => {
            const rooms = this.state.rooms
            rooms.push({title: response.title,
                description: response.description
            })
            console.log(rooms);
        	this.setState({
                name: response.name,
                title: response.title,
                description: response.description,
                players: response.players,
                error_msg: response.error_msg,
                direction: "",
                rooms,
                messages: []
            })
        })
    }

    chatWithPlayers = (e) => {
        e.preventDefault()
        
        if (!localStorage.getItem('token')) {
            console.log("User not logged in. Redirecting...")
            this.props.history.push('/login')
        }
        
        const chat = {
            'message': this.state.chat
        }
        
        fetch("http://localhost:8000/api/adv/say/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(chat)
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                chat: "",
                error_msg: response.error_msg
            })
        })
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            console.log("User not logged in. Redirecting...")
            this.props.history.push('/login')
        }

        fetch("http://localhost:8000/api/adv/init/", {
            method: "GET",
            headers: {
                "Authorization": `Token ${localStorage.getItem('token')}`
            },
        })
        .then(response => response.json())
        .then(response => {
            const rooms = this.state.rooms
            rooms.push({title: response.title,
                        description: response.description
                    })
            this.setState({
                uuid: response.uuid,
                name: response.name,
                title: response.title,
                description: response.description,
                players: response.players,
                rooms: rooms
            })
            
            var pusher = new Pusher('27d8535b80521a8ce4ae', {
                cluster: 'us2',
                forceTLS: true
            });
                
            var channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
            channel.bind('broadcast', data => {
                const messages = this.state.messages;
                messages.push(data.message);
                this.setState({
                    messages
                })
            });
        })
    }

    render() {
        return(
            <Fragment>
                <Col>
                    {this.state.rooms.map((room, index) => (
                        <div key={index}>
                            <h1>{room.title}</h1>
                            <h3>{room.description}</h3>
                            <hr />
                        </div>
                    ))}

                    {this.state.messages.map((message, id) => (
                        <div key={id}>
                            <p>{message}</p>
                            <hr />
                        </div>
                    ))}

                    {/* {this.state.chats.map((chat, id) => (
                        <div key={id}>
                            <p>{chat}</p>
                            <hr />
                        </div>
                    ))} */}
                </Col>
            
                <Form inline onSubmit={this.movePlayer} method="POST">
                    <Col sm={8} md={8}>
                        <FormGroup>
                            <Label for="direction">
                                Enter direction ( n | e | w | s ) to move player:
                            </Label>
                            <Input
                                name="direction"
                                id="direction"
                                type="text"
                                placeholder="n | e | w | s"
                                value={this.state.direction}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={3} md={3}>
                        <Button>Move</Button>
                    </Col>
                </Form>

                <Form inline onSubmit={this.chatWithPlayers} method="POST">
                    <Col sm={8} md={8}>
                        <FormGroup>
                            <Label for="chat">
                                Send message to players:
                            </Label>
                            <Input
                                name="chat"
                                id="chat"
                                type="text"
                                placeholder="Hello Room..."
                                value={this.state.chat}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={3} md={3}>
                        <Button>Send</Button>
                    </Col>
                </Form>
            </Fragment>

        );
    }
}



export default withRouter(Play);