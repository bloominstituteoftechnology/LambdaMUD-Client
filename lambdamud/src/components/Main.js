import React from 'react';
import Modal from './Modal/Modal';
import axios from 'axios';
import MainUserInfo from './MainUserInfo';
import Pusher from 'pusher-js';
import { setPusherClient } from 'react-pusher';
import { MainHeaderContainer, MainHeader } from './StyledComponents/Header';
import { MainContainer, MainChatContainer, MainChat, BottomContainer, MainForm, MainInput, MainButton, Loading } from './StyledComponents/Main';

const socket = new Pusher('af304e3c203b2e7aaf85', {
    cluster: 'us2',
    forceTLS: true
})

setPusherClient(socket)

class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            user_input: '',
            modal: false,
            loggedIn: false,
            user_info: []
        }
    }

    componentDidUpdate() {
        const element = document.getElementById('main-chat')
        if (element) {
            element.scrollTop = element.scrollHeight
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('https://salty-tundra-21950.herokuapp.com/api/adv/init/', { headers: { Authorization: 'Token ' + token } })
                .then(response => {
                    let user_info = [];
                    response.data.broadcast = [];
                    user_info.push(response.data);

                    this.setState({ user_info, loggedIn: true })

                    let channel = socket.subscribe('p-channel-' + response.data.uuid);
                    channel.bind('broadcast', data => {
                        user_info = this.state.user_info.slice();
                        let length = user_info.length - 1;
                        user_info[length].broadcast.push(data.message);
                        this.setState({ user_info });
                    });
                })
                .catch(() => this.setState({ modal: true }))

        } else {
            this.setState({ modal: true });
        }
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    move = event => {
        if (event.preventDefault) {
            event.preventDefault();
        }

        const token = localStorage.getItem('token');
        const header = { headers: { Authorization: 'Token ' + token } };

        let direction = { direction: this.state.user_input };

        if (event === 'n' || event === 's' || event === 'w' || event === 'e') {
            direction = { direction: event }
        }

        const input = this.state.user_input.split(' ');

        if (input[0] === 'say') {
            this.say(header, input);
            return;
        }

        axios
            .post('https://salty-tundra-21950.herokuapp.com/api/adv/move', direction, header)
            .then(response => {
                const user_info = this.state.user_info.slice();
                response.data.broadcast = [];
                user_info.push(response.data);
                this.setState({ user_info, user_input: '' })
            })
            .catch(err => console.log(err));
    }

    say = (header, input) => {
        input.shift();
        input = input.join(' ');
        const message = { message: input };

        axios
            .post('https://salty-tundra-21950.herokuapp.com/api/adv/say', message, header)
            .then(response => {
                const user_info = this.state.user_info.slice();
                response.data.broadcast = [];
                user_info.push(response.data);
                this.setState({ user_info, user_input: '' });
            })
            .catch(err => console.log(err));
    }

    logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    render() {
        return (
            <MainContainer>

                <Modal modal={this.state.modal} history={this.props.history} />

                <MainHeaderContainer>
                    <MainHeader onClick={this.logout}>Main Screen</MainHeader>
                </MainHeaderContainer>

                <MainChatContainer>

                    {this.state.loggedIn ?
                        <React.Fragment>

                            <MainChat id='main-chat'>
                                {this.state.user_info.map(user => <MainUserInfo key={Math.random()} user={user} move={this.move} />)}
                            </MainChat>

                            <BottomContainer>
                                <MainForm onSubmit={this.move}>
                                    <MainInput onChange={this.handleInput} type='text' value={this.state.user_input} name='user_input' />
                                    <MainButton onClick={this.move}>Send</MainButton>
                                </MainForm>
                            </BottomContainer>

                        </React.Fragment>
                        : <Loading>Loading...</Loading>}

                </MainChatContainer>

            </MainContainer>
        );
    }
}

export default Main;