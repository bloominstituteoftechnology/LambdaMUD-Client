import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUser, setBind, moveUser } from '../store/actions';

import MainPage from '../components/Main/MainPage';
import axios from "axios";
import Pusher from "pusher-js";
import AuthRedirect from "../components/Main/AuthRedirect";

/**
 * Handles all the game view's actions to be sent to the action/reducer
 */
class MainView extends Component {
    state = {
        command: '',
        rooms: [],
        title: '',
        description: '',
        userMessage: '',
        players: [],
        binded: false,

    }

    /**
     * Handles the input's change
     * @param e - Event
     */
    handleChange = e => {
        this.setState({
            ...this.state.command,
            command: e.target.value
        });
    };

    /**
     * Executes when the component mounts. Gets the user's information and sets the Pusher subscriptions
     */
    componentDidMount() {
        this.handleSubmit();
        this.props.getUser();
        this.pusherSub();
        // this.displayRoom();
    }

    /**
     * Sets the Pusher subscriptions and binds the channels to it
     */
    pusherSub = () => {
        // Creates a new Pusher object
        let pusher = new Pusher('aa9399a4a86317a4a570', {
            cluster: 'us2',
            forceTLS: true
        });

        // Define the UUID of the player from the localstorage.
        // Note that we should always have a key as the page does not load
        // without being logged in.
        let vuuid = localStorage.getItem('uuid')
        console.log(`p-channel-${vuuid}`);

        // Create a channel and subscript the channel to the pusher object
        const channel = pusher.subscribe(`p-channel-${vuuid}`);

        // Unbind the event to prevent duplicates
        channel.unbind('my-event');

        // Then bind the event again.
        // Adds a new room to the state with the Pusher's message.
        // This is the `user say` message
        channel.bind('my-event', data => {
            // Checks if we have have reached max amount of messages,
            // and if so, refresh the array for a cleaner canvas.
            if (this.state.rooms.length >= 6) {
                const id = this.state.rooms.length + 1;
                const newRoom = {
                    id: {
                        'id': id,
                        'title': '',
                        'description': data.message,
                        'room': false
                    }
                }

                this.setState(({
                    rooms: [newRoom]
                }))
            } else {
                const id = this.state.rooms.length + 1;
                const newRoom = {
                    id: {
                        'id': id,
                        'title': '',
                        'description': data.message,
                        'room': false
                    }
                }

                this.setState(prevState => ({
                    rooms: [...prevState.rooms, newRoom]
                }))
            }
        });

        // Adds a new room to the state with the Pusher's message.
        // This is the `user enter/leave` message
        const channel2 = pusher.subscribe(`p-channel-${vuuid}`);
        channel2.bind('broadcast', data => {
            // Checks if we have have reached max amount of messages,
            // and if so, refresh the array for a cleaner canvas.
            if (this.state.rooms.length >= 6) {
                const id = this.state.rooms.length + 1;
                const newRoom = {
                    id: {
                        'id': id,
                        'title': '',
                        'description': data.message,
                        'room': false
                    }
                }

                this.setState(({
                    rooms: [newRoom]
                }))
            } else {
                const id = this.state.rooms.length + 1;
                const newRoom = {
                    id: {
                        'id': id,
                        'title': '',
                        'description': data.message,
                        'room': false
                    }
                }

                this.setState(prevState => ({
                    rooms: [...prevState.rooms, newRoom]
                }))
            }

        });

    }

    /**
     * Handles submitting the user's commands
     * @param e
     */
    handleSubmit = () => {
        // Get the first 3 chars of the input to determine if the input is
        // say or otherwise anything else.
        const cmd = this.state.command.substring(0,3);

        // If say, send to the say endpoint.
        if (cmd === 'say') {
            this.userSay(this.state.command.substring(4, this.state.command.length));

        } else {
            this.userMove(this.state.command);
        }
    }

    userSay = (message) => {
        // Get the token
        let token = localStorage.getItem('key');

        // Set the headers
        let config = {
            headers: {
                Authorization: `Token ${token}`
            }
        }

        const endpoint = 'https://tales-of-tacronora.herokuapp.com/api/adv/say/'

        // Set to the message
        const cmd = { "message": `${message}`};

        axios.post(endpoint, cmd, config).then(res => {
            // Again, checks if we have have reached max amount of messages,
            // and if so, refresh the array for a cleaner canvas.
            if (this.state.rooms.length >= 6) {
                const id = this.state.rooms.length + 1;
                const newRoom = {
                    id: {
                        'id': id,
                        'title': '',
                        'description': res.data.message,
                        'room': false
                    }
                }

                this.setState(({
                    rooms: [newRoom]
                }))
            } else {
                const id = this.state.rooms.length + 1;
                const newRoom = {
                    id: {
                        'id': id,
                        'title': '',
                        'description': res.data.message,
                        'room': false
                    }
                }

                this.setState(prevState => ({
                    rooms: [...prevState.rooms, newRoom]
                }))
            }
        }).catch(err => {
            console.log(err.response);
        });
    }

    /**
     * Moves the user
     * @param dir - Direction the user is moving in
     */
    userMove = (dir) => {
        // let command = null;
        //
        // if (dir === undefined) {
        //     this.props.moveUser(this.state.command);
        // } else {
        //     this.props.moveUser(dir);
        // }
        // this.displayRoom();

        // Get the token
        let token = localStorage.getItem('key');

        // Set the headers
        let config = {
            headers: {
                Authorization: `Token ${token}`
            }
        }

        const endpoint = 'https://tales-of-tacronora.herokuapp.com/api/adv/move/';
        let command = null;

        if (dir === undefined) {
            command = { "direction": `${this.state.command}`};
        } else {
            command = { "direction": `${dir}`};
        }

        axios.post(endpoint, command, config).then(res => {
            // Again, checks if we have have reached max amount of messages,
            // and if so, refresh the array for a cleaner canvas.
            if (this.state.rooms.length >= 6) {
                let id = this.state.rooms.length + 1;
                const newRoom = {
                    id: {
                        'id': id,
                        'title': res.data.title,
                        'description': res.data.description,
                        'room': true
                    }
                }

                this.setState({
                    rooms: [newRoom]
                })
            } else {
                let id = this.state.rooms.length + 1;
                const newRoom = {
                    id: {
                        'id': id,
                        'title': res.data.title,
                        'description': res.data.description,
                        'room': true
                    }
                }

                this.setState(prevState => ({
                    rooms: [...prevState.rooms, newRoom],
                    players: res.data.players
                }))
            }}).catch(err => {
            console.log(err);
        })
    }

    displayRoom = () => {
        if (this.state.rooms.length >= 6) {
            let id = this.state.rooms.length + 1;
            const newRoom = {
                id: {
                    'id': id,
                    'title': this.props.roomTitle,
                    'description': this.props.roomDesc,
                    'room': true
                }
            }

            this.setState({
                rooms: [newRoom]
            })
        } else {
            let id = this.state.rooms.length + 1;
            const newRoom = {
                id: {
                    'id': id,
                    'title': this.props.roomTitle,
                    'description': this.props.roomDesc,
                    'room': true
                }
            }

            this.setState(prevState => ({
                rooms: [...prevState.rooms, newRoom],
            }));
        }
    }

    /**
     * Render the component
     * @returns {*}
     */
    render() {
        // Set whether we are logged in or not so we can render the appropriate component.
        let isLogged = false;
        if (localStorage.getItem('key')) {
            isLogged = true;
        } else {
            isLogged = false;
        }
        return (
            <Fragment>
                {!isLogged ? <AuthRedirect {...this.props } isLogged={isLogged}/> : <MainPage
                    {...this.props}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    command={this.state.command}
                    title={this.state.title}
                    description={this.state.description}
                    userMessage={this.state.userMessage}
                    rooms={this.state.rooms}
                    players={this.state.players}
                    defUM={this.state.defUM}
                    isLogged={isLogged}
                    userMove={this.userMove}
                /> }
            </Fragment>
        )
    }
};

// Set up props
const mapStateToProps = state => ({
    uuid: state.uuid,
    binded: state.binded,
    pusherMessage: state.pusherMessage,
    username: state.username,
    isLoggedIn: state.isLoggedIn,
    roomTitle: state.roomTitle,
    roomDesc: state.roomDesc
});

export default connect(mapStateToProps, { getUser, setBind, moveUser })(MainView)