import React , { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Pusher from 'pusher-js';
import axios from 'axios'
import moment from 'moment'

export default class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
            command: '',
            fromServer: []
        }
    }
    
    componentDidMount(){
        if (!localStorage.getItem('MUD')){
            return <Redirect to="/" />
        } else {
            this.startGame()
        }
    }

    startPusher(playerChannel){

        let pusher = new Pusher('4830aec0ca635aa67084', {
            cluster: 'us2',
            forceTLS: true
        });
        let user = localStorage.getItem('User')
        console.log(user)
        let channel = pusher.subscribe(`p-channel-${playerChannel}`);

        channel.bind('broadcast', data => {
            // alert(JSON.stringify(data));    
            console.log(data) 
            this.newEvent(data) 
        });
        
    }

    newEvent = (data) => {
        // let temp = this.state.fromServer
        // temp.push(data)
        // this.setState({
        //     fromServer: temp
        // })
        //left to remeber how slick line 51 is
        data.time = Date(Date.now())
        this.setState({
            fromServer: [...this.state.fromServer, data]
        })
    }

    inputHandler = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('MUD') 
        this.props.history.push('/')
    }

    sendCommand = (e) => {
        e.preventDefault()
        console.log('sendCommand')
        let userToken = localStorage.getItem('MUD')
        let authHeader = {
            headers: {
                Authorization: `Token ${userToken}`
            }
        }
        let command
        if(this.state.command.substr(0,3) === 'say'){
            let newCommand = this.state.command.slice(4,)
            console.log(newCommand)
            command = {"message": newCommand}
            axios.post(`https://lambda-mud-mjk.herokuapp.com/api/adv/say/`, (command), authHeader ).then(res => {
                this.newEvent(res.data) 
            }).catch(err => {
                console.log(err.response)
            })
        } else {
            command = {"direction": this.state.command}
            axios.post(`https://lambda-mud-mjk.herokuapp.com/api/adv/move/`, (command), authHeader ).then(res => {

                this.newEvent(res.data) 
            }).catch(err => {
                console.log(err.response)
            })
        }
       
        this.setState({
            command: ''
        })
    }

    startGame = () => {
        // e.preventDefault()
        console.log("startGame")
        let userToken = localStorage.getItem('MUD')
        let authHeader = {
            headers: {
                Authorization: `Token ${userToken}`
            }
        }
        axios.get('https://lambda-mud-mjk.herokuapp.com/api/adv/init/', authHeader).then(res => {   
            this.startPusher(res.data.uuid)
            this.setState({user: res.data})
            this.newEvent(res.data)
        }).catch(err => {
            console.log(err.response)
        })
    }

    // componentDidMount(){
    //     // this.scrollToBottom();
    // }

    scrollToBottom = () => {
        // let isTheEnd =
        // console.log(isTheEnd)
        // var intElemScrollTop = isTheEnd.scrollTop();
        // console.log(intElemScrollTop)
        // isTheEnd.scrollTop = isTheEnd.scrollHeight;
    }

    render(){
        if(this.state.user){

            return(
                <GameDiv> 
                <header>
                    <button onClick={this.logout}>logout {this.state.user.name}</button>
                    
                </header>
                <h1>game div</h1>
                {/* <button onClick={this.startGame}>start</button> */}
                <div className="updates-bin" load={() => {
                    console.log(this)
                }}>

                    {this.state.fromServer.length > 0 ? this.state.fromServer.map((update, i )=> {
                        return (
                            <div className='event'>
                                <div className="updates-left">

                                    <p>{moment(update.time).format('LLL')} - {update.message ? 
                                        <span>{update.message}</span>
                                    : null
                                    }</p>
                                </div>
                                <div key={i} className="updates-right">
                                    
                                    <span> </span><span>{update.name} is in </span>
                                    {update.players ?
                                        (<React.Fragment>
                                            <span>{update.title} with </span>
                                            <React.Fragment>{update.players.map(player => <span>{player}, </span>)}</React.Fragment>
                                        </React.Fragment>) :
                                        null}
                                    <p>{update.description}</p>
                                    <p>{update.response}</p>
                                    
                                    
                                </div>
                            </div>
                        )
                    }) : null}
                    <div ></div>
                </div>
                <form onSubmit={this.sendCommand}>
                    <input autoFocus placeholder="type command" onChange={this.inputHandler} name="command" value={this.state.command} type="text">{this.value}</input>
                </form>
            </GameDiv>
            )
        } else {
            return null
        }
    }
}

const GameDiv = styled.div`
    ${'' /* border: 1px solid red; */}
    background: black;
    color: green;
    height: 100%;
    header{
        text-align: right;
        button{
            color: green;
            border: 1px solid green;
            background: black;
        }
    }
    .updates-bin{
        ${'' /* border: 1px solid red; */}
        overflow: auto;
        height: 70vh;
        rotate: 180;
        width: 50vw;
        display: flex;
        flex-direction: column;
        .event{
            display: flex;
        flex-direction: row;
            .updates-left{
                border: 1px solid red
            }
            .updates-right{
                border: 1px solid blue
            }
        }
    }
`