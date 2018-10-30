import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Pusher from 'pusher-js';

const Box = styled.div`
    max-width: 1000px;
    border: 1px solid black;
    border-radius: 10px;
    margin: 0 auto;
`

const Header = styled.div`
    text-align: left;
    background: teal;
    padding: 1rem;
    font-size: 1.5rem
    font-weight: 900;
    color: white;
    border-radius: 10px 10px 0 0;
`

const Location = styled.div`
    text-align: left;
    padding: 10px 0 10px 10px;
`

const RoomInfo = styled.div`
    text-align: left;
    padding: 10px 0 10px 10px;
    color: blue;
`

const Footer = styled.div`
    border-radius: 0 0 10px 10px;
    background: lightgray;
    padding: 1rem
`

const url = 'https://francis-t-lambda-mud.herokuapp.com'

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            title: '',
            description: '',
            players: [],
            command:'',
        }
    }
    componentDidMount(){
        const token = localStorage.getItem('Authorization')
        axios.get(`${url}/api/adv/init`, { headers: { Authorization: token } })
            .then( res => {
                var pusher = new Pusher('26b67b21432a0283efc8', {
                    cluster: 'us2',
                    forceTLS: true
                  });
                var channel = pusher.subscribe(`p-channel-${res.data.uuid}`);
                channel.bind('broadcast', response => {
                    console.log(response);
                })
                this.setState({
                    name: res.data.name,
                    title: res.data.title,
                    description: res.data.description,
                    players: res.data.players  
                })
            })
            .catch(err => {
                console.log(err.message)
            });
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    //submits request to api endpoint based on the input
    submit = e => {
        e.preventDefault();
        if (this.state.command.includes('move ')){
            const token = localStorage.getItem('Authorization')
            const direction = this.state.command.slice(5)
            const request = { "direction": direction }
            axios.post(`${url}/api/adv/move`,
                request, { headers: { Authorization: token } })
                .then( res => {
                    this.setState({
                        name: res.data.name,
                        title: res.data.title,
                        description: res.data.description,
                        players: res.data.players  
                    })
                })
                .catch( err => {
                    console.log(err.message)
                })
        }
        else if (this.state.command.includes('say ')){
            const token = localStorage.getItem('Authorization')
            const message = this.state.command.slice(4)
            const request = { "message": message }
            axios.post(`${url}/api/adv/say`, request,
                { headers: { Authorization: token } }
            )
            .then( res => {
                // alert(`${this.state.name} says ${message}`)
            })
            .catch( err => {
                console.log(err)
            })
        }
    }
    render(){
        let players = this.state.players.toString().split(' , ');
        Pusher.logToConsole = true;
        return(
            <Box>
                <Header>Adventure</Header>
                <Location>{this.state.title}</Location>
                <Location>{this.state.description}</Location>
                <RoomInfo>
                    {players} is standing in the room
                </RoomInfo>
                <Footer>
                    <input name='command' value={this.state.command} onChange={this.handleChange}/>
                    <button onClick={this.submit}>Send</button>
                </Footer>
            </Box>
        )
    }
}

export default Game;