import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Pusher from 'pusher-js';
import Background from '../images/game-background.jpg';
import CardinalImage from "../images/cardinal.png";

const Board = styled.div`
    display: flex;
    justify-content: space-between;
    @media(max-width: 900px){
        flex-drection: column;
    }
`

const Box = styled.div`
    border: double;
    border-radius: 1rem 1rem 0 0;
    margin: 10% auto;
    min-width: 50%;
`;

// const Button = styled.button`
//     background: teal;
//     color: white;
//     font-size: 1rem;
//     font-weight: 600
//     border: 2px solid white;
//     border-radius: 0.5rem;
//     right: 0;
//     padding: 0.5rem;
// `;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    outline: 0;
    &:hover {
        background: white;
        color: teal;
    }
`;

const Location = styled.div`
    text-align: left;
    padding: 3% 0 3% 3%;
    font-weight: 700;
    font-size: 2rem;
    color: white;
`;

const RoomInfo = styled.div`
    text-align: left;
    padding: 3% 0 3% 3%;
    color: white;
    font-size: 1.2rem;
    font-weight: 700;
`;

const Footer = styled.form`
    background: transparent;
    padding: 2%;
`;

const MessageLogs = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    background: transparent;
    color: white;
    border-radius: 0 0 1rem 1rem;
    font-size: 1.2rem;
    font-weight: 650;
`;

const Help = styled.div`
    width: 25%;
    margin: 10% 2%;
    display: flex;
    flex-direction: column;
`;

const Cardinal = styled.div`
    background-image: url(CardinalImage);
    box-sizing: border-box;
`;

const Direction = styled.button`
    border: none;
    font-size: 2.5rem;
    background: none;
    outline: 0;
    &:hover {
        background: teal;
        color: white !important;
        padding: 2%;
        border-radius: 25px;
    }
`;

const Title = styled.header`
    padding: 1rem;
`;

const Map = styled.div`
    display: inline-grid;
    grid-template-columns: repeat(5, 75px);
    grid-template-rows: repeat(6, 75px);
    text-align: center;
    width: 25%;
    margin: 10% 2%;
`;

const Room = styled.div`
    width: 75px;
    height 75px;
    border: 2px solid red;
    font-weight: 600;
    font-size: 0.8rem
    margin: auto;
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
                    this.setState(() => ( { logs } ))
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
        this.setState({ logs: [] })
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
                    this.setState(() => ({
                        name: res.data.name,
                        title: res.data.title,
                        description: res.data.description,
                        players: res.data.players  
                    }))
                })
                .catch( err => { console.log(err.message) })
        }
        // say => players in same room
        else if (this.state.command.includes('say ')){
            const token = localStorage.getItem('Authorization')
            const message = this.state.command.slice(4)
            const request = { "message": message }
            this.state.logs.push(message)
            this.setState({ logs: this.state.logs })
            axios.post(`${url}/api/adv/say`, request,
                { headers: { Authorization: token } }
            )
            .then( res => {
                console.log(res.data)
            })
            .catch( err => { console.log(err) })
        // shout => all players in the world
        } else if (this.state.command.includes('shout ')) {
            const token = localStorage.getItem('Authorization')
            const message = this.state.command.slice(6)
            const request = { "message": message }
            this.state.logs.push(message);
            this.setState({ logs: this.state.logs });
            axios.post(`${url}/api/adv/shout`, request,
                { headers: { Authorization: token } }
            )
            .then( res => {
                console.log(res.data)
            })
            .catch( err => { console.log(err) })
        }
    }
    //moves with a click to the respective direction if the movement is available
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
            <Board>
                {/* Game Map */}
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
                {/* main game window */}
                <Box style={{ height: "100%", background: `url(${Background})`, textShadow: '0 0 5px #000000' }}>
                    <Header>
                        Adventure
                        <Player>Logged in as: {this.state.name}</Player>
                        <Refresh onClick={this.refresh}>Refresh</Refresh>
                    </Header>
                    <div>
                        <Location>{this.state.title}</Location>
                        <Location>{this.state.description}</Location>
                        <div style={{textAlign: "left", paddingLeft: '3%', color: 'white', fontSize: '2rem', fontWeight: '750' }}>
                        -------------------------------------------------------------------------
                        </div>
                        <RoomInfo>
                            {players} is standing in the room
                        </RoomInfo>
                    </div>
                    <Footer onSubmit={this.submit}>
                        <input style={{ padding: "1%", borderRadius: "10px" }} onSubmit={this.submit} name='command' value={this.state.command} onChange={this.handleChange}/>
                        <Refresh onClick={this.submit}>Send</Refresh>
                    </Footer>
                    {/* Message Log */}
                    <MessageLogs>
                        <Title>Message log:</Title>
                        <div>
                            {this.state.logs.map(element => {
                                return(
                                    <div key={element}>{element}<br /></div>
                                )
                            })}
                        </div>
                        <Refresh style={{margin: '1rem'}} onClick={this.resetLog}>Clear log</Refresh>
                    </MessageLogs>
                </Box>
                {/* help menu */}
                <Help>
                    <h1 style={{padding: '0'}}>Help Menu:</h1>
                    <p><Span>move 'direction': </Span>moves you in the direction specified (n, e, s, w)</p>
                    <p><Span>click direction on cardinal: </Span>moves you in the direction specified (n, e, s, w)</p>
                    <p><Span>say 'message': </Span>says the input message to the players present in the room</p>
                    <p><Span>shout 'message': </Span>shouts the input message to all players</p>
                    <Cardinal style={{ background: `url(${CardinalImage}) no-repeat center center`}}>
                        <Direction style={{ color:'red' }} 
                            onClick={this.cardinalMove}
                            value='n'>N</Direction><br />
                        <Direction style={{ margin:'10% 15%' }} onClick={this.cardinalMove} value='w'>W</Direction>
                        <Direction style={{ margin:'10% 15%' }} onClick={this.cardinalMove} value='e'>E</Direction><br />
                        <Direction onClick={this.cardinalMove} value='s'>S</Direction>
                    </Cardinal>
                </Help>
              
            </Board>
        )
    }
}

export default Game;