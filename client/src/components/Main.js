import React from 'react';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import axios from 'axios';
import background from '../images/background.jpg';
import logo from '../images/logo2.png';
import NavBar from './Nav/Navbar';
import Container from './Content/Container';
import Pusher from 'pusher-js';

injectGlobal`
    body {
        background-image: url(${background});
        background-size: cover;
    }
    // /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 2px grey; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgb(150,150,150); 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: rgb(100,100,100); 
    }
`

const Div = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0;
    padding: 0
`

const Image = styled.img`
    margin: 20px 0;
`

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.pusher = new Pusher('b7e5c7c53b3d822d9be7', {
            cluster: 'us2'
        });
        this.state = {
            user: {
                username: '',
                uuid: ''
            },
            room: {
                title: '',
                description: ''
            },
            playerList: [],
            messages: [
                {
                    message: ['Welcome adventurer'],
                    tag: 'system'
                }],
            command: ''
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('lambda-token');
        if (!token) {
            this.props.history.replace('/login')
        }
        this.gameInit(token);
    }

    changeHandler = (e) => {
        this.setState({
            command: e.target.value
        });
    }

    move = (direction) => {
        const token = localStorage.getItem('lambda-token');
        const payload = {
            direction: direction
        }
        return axios.post("https://lambda-mud-proj.herokuapp.com/api/adv/move", payload,
            {
                headers: {
                    "Authorization": `Token ${token}`,
                }
            })
    }

    say = (msg) => {
        const token = localStorage.getItem('lambda-token');
        const payload = {
            message: msg
        }
        console.log(payload)
        return axios.post("https://lambda-mud-proj.herokuapp.com/api/adv/say", payload,
            {
                headers: {
                    "Authorization": `Token ${token}`,
                }
            })
    }

    parseCommand = (command) => {
        const commands = command.trim().split(' ');
        if (commands[0] === 'move') {
            if (commands.length === 2) {
                return this.move(commands[1])
            } else {
                return {
                    data: {
                        error_msg: 'Invalid command or missing command argument.'
                    }
                }
            }
        } else if (commands[0] === 'say') {
            if (commands.length >= 2) {
                return this.say(`${commands.slice(1).join(' ')}`)
            } else {
                return {
                    data: {
                        error_msg: 'Invalid command or missing command argument.'
                    }
                }
            }
        } else {
            return {
                data: {
                    error_msg: 'Invalid command or missing command argument.'
                }
            }
        }
    }

    submitHandler = async (e) => {
        e.preventDefault();
        const response = await this.parseCommand(this.state.command);
        console.log(response);
        if (response.data.error_msg) {
            this.setState({
                messages: [...this.state.messages, { message: [response.data.error_msg], tag: 'error' }],
                command: ''
            });
        }
        else if (response.data.message) {
            this.setState({
                messages: [...this.state.messages, { message: [`You say ${response.data.message}`], tag: 'player' }],
                command: ''
            });
        } else {
            const newMsg = { message: [response.data.title, response.data.description], tag: 'system' }
            this.setState({
                messages: [...this.state.messages, newMsg],
                room: {
                    ...this.state.room,
                    title: response.data.title,
                    description: response.data.description
                },
                playerList: response.data.players,
                command: ''
            });
        }
    }

    gameInit = async (token) => {
        try {
            const response = await axios.get("https://lambda-mud-proj.herokuapp.com/api/adv/init",
                {
                    headers: {
                        "Authorization": `Token ${token}`,
                    }
                }
            )

            const user = {
                username: response.data.name,
                uuid: response.data.uuid
            }

            const room = {
                title: response.data.title,
                description: response.data.description,

            }

            const playerList = response.data.players;

            this.setState({
                user: user,
                room: room,
                messages: [...this.state.messages, { message: [room.title, room.description], tag: 'system' }],
                playerList: playerList
            });

            const sub = 'p-channel-' + response.data.uuid;
            const channel = this.pusher.subscribe(sub);;
            channel.bind('broadcast', data => {
                this.setState({ messages: [...this.state.messages, { message: [data.message], tag: 'player' }] });
            })
        } catch (error) {

        }
    }

    render() {
        return (
            <Div>
                <div className="header">
                    <NavBar username={this.state.user.username} />
                    <Image src={logo} alt="LambdaMUD" />
                </div>
                <div className="content">
                    <Container
                        user={this.state.user}
                        room={this.state.room}
                        messages={this.state.messages}
                        error_msg={this.state.error_msg}
                        playerList={this.state.playerList}
                        command={this.state.command}
                        changeHandler={this.changeHandler}
                        submitHandler={this.submitHandler}
                    />
                </div>
            </Div>
        );
    }
}

export default Main;

