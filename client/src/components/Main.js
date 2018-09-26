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
                players: []
            },
            text: ''
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('lambda-token');
        if (!token) {
            this.props.history.replace('/login')
        }
        this.gameInit(token);
        const channel = this.pusher.subscribe(`p-channel-${this.state.uuid}`)
        channel.bind('broadcast', data => {
            this.setState({ text: data.message });
        })
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
                players: response.data.players
            }

            this.setState({
                user,
                room
            });

        } catch (error) {
            console.log(error.response)
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
                    <Container user={this.state.user} room={this.state.room} />
                </div>
            </Div>
        );
    }
}

export default Main;