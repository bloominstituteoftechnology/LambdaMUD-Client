import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Pusher from 'pusher-js';

const Box = styled.div`
    max-width: 1000px;
    border: 1px solid black;
    border-radius: 1rem 1rem 0 0;
    margin: 0 auto;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    text-align: left;
    background: teal;
    padding: 1rem;
    font-size: 1.5rem
    font-weight: 900;
    color: white;
    border-radius: 1rem 1rem 0 0;
`;

const Player = styled.div`
    font-size: 1rem;
    background: teal;
    color: white;
`;

const Refresh = styled.button`
    background: teal;
    color: white;
    font-size: 1rem;
    font-weight: 600
    border: 2px solid white;
    border-radius: 0.5rem;
    right: 0;
    padding: 0.5rem;
`;

const Location = styled.div`
    text-align: left;
    padding: 1rem 0 1rem 1rem;
`;

const RoomInfo = styled.div`
    text-align: left;
    padding: 1rem 0 1rem 1rem;
    color: blue;
`;

const Footer = styled.div`
    background: #D8D7D7;
    padding: 1rem
`;

const MessageLogs = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    background: #D8D7D7;
    color: gray;
    border-radius: 0 0 1rem 1rem;
`;

const Help = styled.div`
    position: absolute
    max-width: 300px;
    top: 10px;
    right: 50px;
`;

const Cardinal = styled.div`
    position: absolute;
    top: 300px;
    right: 150px;
`;

const Direction = styled.button`
    border: none;
    font-size: 2.5rem;
    background: none;
    outline: 0;
`;

const Title = styled.header`
    padding: 1rem;
`;

const Button = styled.button`
    padding: 0.5rem;
    margin: 1rem;
`;

const Map = styled.div`
    display: inline-grid;
    grid-template-columns: repeat(5, 75px);
    grid-template-rows: repeat(6, 75px);
    text-align: center;
    padding: 1rem;
    position: absolute;
    top: 10px;
    left: 25px;
`;

const Room = styled.div`
    width: 75px;
    height 75px;
    border: 2px solid red;
    font-weight: 600;
    font-size: 0.8rem
    margin: 0 auto;
    background: black;
    color: white;
`;

const Span = styled.span`
  font-size: 1rem;
  font-weight: 900;
  color: blue
`;

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
            logs: [],
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
                    const system = Object.values(response).toString()
                    let logs = [...this.state.logs]
                    logs.push(system)
                    this.setState({logs})
                    // alert(system)
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
    resetLog = e => {
        e.preventDefault();
        this.setState({logs: []})
    }
    //refreshes the content in the box
    refresh = e =>{
        e.preventDefault();
        const token = localStorage.getItem('Authorization')
        axios.get(`${url}/api/adv/init`, { headers: { Authorization: token } })
        .then( res => {
            this.setState({
                name: res.data.name,
                title: res.data.title,
                description: res.data.description,
                players: res.data.players  
            })
        })
        .catch( err => { console.log(err.message) })
    }
    //submits request to api endpoint based on the input
    submit = e => {
        e.preventDefault();
        if (this.state.command.includes('move ')){
            const token = localStorage.getItem('Authorization')
            const direction = this.state.command.slice(5).toLowerCase();
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
                .catch( err => { console.log(err.message) })
        }
        else if (this.state.command.includes('say ')){
            const token = localStorage.getItem('Authorization')
            const message = this.state.command.slice(4)
            const request = { "message": message }
            this.state.logs.push(message)
            axios.post(`${url}/api/adv/say`, request,
                { headers: { Authorization: token } }
            )
            .then( res => {
                console.log(res.data)
            })
            .catch( err => { console.log(err) })
        }
    }
    cardinalMove = e => {
        e.preventDefault();
        const token = localStorage.getItem('Authorization');
        const request = {'direction': e.target.value}
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
        .catch( err => { console.log(err.message) })
    }
    render(){
        let players = this.state.players.toString().split(' , ');
        return(
            <div>
                <Box>
                    <Header>
                        Adventure
                        <Player>Logged in player: {this.state.name}</Player>
                        <Refresh onClick={this.refresh}>Refresh</Refresh>
                    </Header>
                    <Location>{this.state.title}</Location>
                    <Location>{this.state.description}</Location>
                    <div style={{textAlign: "left", paddingLeft: '1rem'}}>
                    ------------------------------------------------------------------
                    </div>
                    <RoomInfo>
                        {players} is standing in the room
                    </RoomInfo>
                    <Footer>
                        <input name='command' value={this.state.command} onChange={this.handleChange}/>
                        <button onClick={this.submit}>Send</button>
                    </Footer>
                </Box>
                <Help>
                        <h1 style={{padding: '0'}}>Help Menu:</h1>
                        <p><Span>move 'direction': </Span>moves you in the direction specified (n, e, s, w)</p>
                        <p><Span>click direction on cardinal: </Span>moves you in the direction specified (n, e, s, w)</p>
                        <p><Span>say 'message': </Span>say the input message to the players present in the room</p>
                </Help>
                <Cardinal>
                    <Direction style={{color:'red'}} 
                        onClick={this.cardinalMove}
                        value='n'>N</Direction><br />
                    <Direction style={{padding:'2rem'}} onClick={this.cardinalMove} value='w'>W</Direction>
                    <Direction style={{padding:'2rem'}} onClick={this.cardinalMove} value='e'>E</Direction><br />
                    <Direction onClick={this.cardinalMove} value='s'>S</Direction>
                </Cardinal>
                <MessageLogs>
                    <Title>Message log:</Title>
                    <div>
                        {this.state.logs.map(element => {
                            return(
                                <div key={element}>{element}<br /></div>
                            )
                        })}
                    </div>
                    <Button onClick={this.resetLog}>Clear log</Button>
                </MessageLogs>
                <Map>
                    <Room>Dead End</Room>
                    <Room>X</Room>
                    <Room>Cave</Room>
                    <Room>Real Treasure Chamber</Room>
                    <Room>X</Room>
                    {/* new row */}
                    <Room>Tunnel Narrow Passage</Room>
                    <Room>X</Room>
                    <Room>Grand Overlook</Room>
                    <Room>Treasure Chamber</Room>
                    <Room>X</Room>
                    {/* new row */}
                    <Room>Tunnel</Room>
                    <Room>Conference Room</Room>
                    <Room>Foyer</Room>
                    <Room>Narrow Passage</Room>
                    <Room>X</Room>
                    {/* new row */}
                    <Room>X</Room>
                    <Room>X</Room>
                    <Room>Outside Cave Entrance</Room>
                    <Room>X</Room>
                    <Room>X</Room>
                </Map>
            </div>
        )
    }
}

export default Game;