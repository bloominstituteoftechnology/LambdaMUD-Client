import React from 'react';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import axios from 'axios';
import NavBar from './Nav/Navbar';
import Container from './Content/Container';
// import background from '../images/background.jpg';


import Pusher from 'pusher-js';

injectGlobal`
    body {
    
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
        this.pusher = new Pusher('8d2b7b3edb760bb9bd8f', {
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
                    message: ['Welcome Adventurer!'],
                    tag: 'system'
                }],
            command: ''
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('mdtkn');
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
        const token = localStorage.getItem('mdtkn');
        const payload = {
            direction: direction
        }
        return axios.post("https://rlvmud.herokuapp.com/api/adv/move", payload,
            {
                headers: {
                    "Authorization": `Token ${token}`,
                }
            })
    }

    say = (msg) => {
        const token = localStorage.getItem('mdtkn');
        const payload = {
            message: msg
        }
        return axios.post("https://rlvmud.herokuapp.com/api/adv/say", payload,
            {
                headers: {
                    "Authorization": `Token ${token}`,
                }
            })
    }

    shout = (msg) => {
        const token = localStorage.getItem('mdtkn');
        const payload = {
            message: msg
        }
        return axios.post("https://rlvmud.herokuapp.com/api/adv/shout", payload,
            {
                headers: {
                    "Authorization": `Token ${token}`,
                }
            })
    }




parseCommand = (command) => {
        const commands = command.trim().split(' ');
        if (commands[0].toLowerCase() === 'move' && commands.length === 2) {
            return this.move(commands[1])

        } else if (commands[0].toLowerCase() === 'say' && commands.length >= 2) {
            return this.say(`${commands.slice(1).join(' ')}`)

        } else if (commands[0].toLowerCase() === 'shout' && commands.length >= 2) {
            return this.shout(`${commands.slice(1).join(' ')}`)
               
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
        if (response.data.error_msg) {
            this.setState({
                messages: [...this.state.messages, { message: [response.data.error_msg], tag: 'error' }],
                command: ''
            });
        } else if (response.data.message) {
            let color_tag = '';
            if (response.data.message.includes('say')){
                color_tag = 'player';
            } else if (response.data.message.includes('shout')) {
                color_tag = 'shout';
            }
            this.setState({
                messages: [...this.state.messages, { message: [response.data.message], tag: color_tag }],
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
            const response = await axios.get("https://rlvmud.herokuapp.com/api/adv/init",
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
                let color_tag = '';
                if (data.message.includes('whisper')){
                    color_tag = 'whisper';
                } else if (data.message.includes('shout')) {
                    color_tag = 'shout'
                } else {
                    color_tag = 'player'
                }
                this.setState({ messages: [...this.state.messages, { message: [data.message], tag: color_tag }] });
            })
        } catch (error) {

        }
    }

    render() {
        return (
            <Div>
                <div className="header">
                    <NavBar username={this.state.user.username} />
                    {/* <Image src={} alt="LambdaMUD" /> */}
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

