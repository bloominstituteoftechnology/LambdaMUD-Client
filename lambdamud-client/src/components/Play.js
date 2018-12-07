import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import Pusher from 'pusher-js';
import { FormGroup, Form, Col, Label, Input, Button, Row } from 'reactstrap';

// Component Play allows user to move, send messages to other players
// in room.
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

    // method to change Input value with user entered text.
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    // method to move player (n | e | w | s) as per user
    // entered value
    movePlayer = (e) => {
        e.preventDefault()
        
        // validate if user is logged in else redirect to login page
        if (!localStorage.getItem('token')) {
            console.log("User not logged in. Redirecting...")
            this.props.history.push('/login')
        }
        
        const direction = {
            'direction': this.state.direction
        }
        
        // POST direction and authorization token to /api/adv/move
        // if successful modify application state with name, title,
        // description, players, rooms, error_msg (if any) from response.
        // Also reset direction and messages

        fetch("https://lambdamud--bhavik.herokuapp.com/api/adv/move/", {
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

    // method to allow logged in player to send message to other
    // players in room.
    chatWithPlayers = (e) => {
        e.preventDefault()
        
        // validate if user is logged in else redirect to login page
        if (!localStorage.getItem('token')) {
            console.log("User not logged in. Redirecting...")
            this.props.history.push('/login')
        }
        
        const chat = {
            'message': this.state.chat
        }
        
        // POST Authorization token and chat message to /api/adv/say.
        // Update state with error_msg (if any) and reset chat to blank. 
        fetch("https://lambdamud--bhavik.herokuapp.com/api/adv/say/", {
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

    // method to load current room of user when user first logs in
    componentDidMount() {
        // validate if user is logged in else redirect to login page
        if (!localStorage.getItem('token')) {
            console.log("User not logged in. Redirecting...")
            this.props.history.push('/login')
        }

        // send GET request with authorization token as header to /api/adv/init
        // Update application state with uuid, name, title, description, players
        // in response. Update rooms with next room (response.title and 
        // response.description)
        // Also subscribe to pusher channel and bind to broadcast event to 
        // update messages when any user enters, leaves room or sends message
        // to players in room

        fetch("https://lambdamud--bhavik.herokuapp.com/api/adv/init/", {
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
                <Col sm={8} md={8}>
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

                </Col>
            
                <Form onSubmit={this.movePlayer} method="POST">
                    <Col>
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
                    <Col>
                        <Button>Move</Button>
                    </Col>
                </Form>
                <hr/>
                <Form onSubmit={this.chatWithPlayers} method="POST">
                    <Col>
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
                    <Col>
                        <Button>Send</Button>
                    </Col>
                </Form>
            </Fragment>

        );
    }
}

export default withRouter(Play);