import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUser, setBind } from '../store/actions';

import MainPage from '../components/Main/MainPage';
import axios from "axios";
import Pusher from "pusher-js";

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


    handleChange = e => {
        this.setState({
            ...this.state.command,
            command: e.target.value
        });
    };

    componentDidMount() {
        this.handleSubmit();
        this.props.getUser();
        // this.pusherSub();
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (!this.props.binded) {
            this.pusherSub();
            this.props.setBind(true);
        }
    }

    pusherSub = () => {
        let pusher = new Pusher('aa9399a4a86317a4a570', {
            cluster: 'us2',
            forceTLS: true
        });

        const channel = pusher.subscribe(`p-channel-${this.props.uuid}`);
        channel.unbind('my-event');
        channel.bind('my-event', data => {
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

        const channel2 = pusher.subscribe(`p-channel-${this.props.uuid}`);
        console.log(`p-channel-${this.props.uuid}`);
        channel2.bind('broadcast', data => {
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

    handleSubmit = e => {
        // this.props.getUser();
        // console.log('UUID', this.props.uuid)
        let token = localStorage.getItem('key');
        // console.log(token);

        let config = {
            headers: {
                Authorization: `Token ${token}`
            }
        }

        const cmd = this.state.command.substring(0,3);
        if (cmd === 'say') {
            // const endpoint = 'http://localhost:8000/api/adv/say';
            const endpoint = 'https://tales-of-tacronora.herokuapp.com/api/adv/say/'
            let cmd1 = this.state.command.substring(4, this.state.command.length)
            const command = { "message": `${cmd1}`};

            axios.post(endpoint, command, config).then(res => {
                // console.log(res);
            }).catch(err => {
                console.log(err.response);
            });

        } else {
            // const endpoint = 'http://localhost:8000/api/adv/move';
            const endpoint = 'https://tales-of-tacronora.herokuapp.com/api/adv/move/'
            const command = { "direction": `${this.state.command}`};

            axios.post(endpoint, command, config).then(res => {
                // console.log(res);
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
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }

    render() {
        let isLogged = false;
        if (localStorage.getItem('key')) {
            isLogged = true;
        } else {
            isLogged = false;
        }
        return (
            <Fragment>
                {!isLogged ? 'You must login' : <MainPage
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
                /> }
            </Fragment>
        )
    }
};

const mapStateToProps = state => ({
    uuid: state.uuid,
    binded: state.binded,
    pusherMessage: state.pusherMessage,
});

export default connect(mapStateToProps, { getUser, setBind })(MainView)