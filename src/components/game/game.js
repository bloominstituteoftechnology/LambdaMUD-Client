import React , { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Pusher from 'pusher-js';
import axios from 'axios'
import UpdatesBin from './updatesBin';

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

    startGame = () => {
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

    startPusher(playerChannel){
        let pusher = new Pusher('4830aec0ca635aa67084', {
            cluster: 'us2',
            forceTLS: true
        });
        let channel = pusher.subscribe(`p-channel-${playerChannel}`);
        channel.bind('broadcast', data => {
            this.newEvent(data) 
        });
        
    }

    newEvent = (data) => {
        data.time = Date.now()
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

    sendCommand = (e) => {
        e.preventDefault()
        let userToken = localStorage.getItem('MUD')
        let authHeader = {
            headers: {
                Authorization: `Token ${userToken}`
            }
        }
        let command
        if(this.state.command.substr(0,3) === 'say'){
            let newCommand = this.state.command.slice(4,)
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

    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('MUD') 
        this.props.history.push('/')
    }

    render(){
        if(this.state.user){
            return (
                <GameDiv> 
                    <header>
                        <h1>MUD</h1>
                        <button onClick={this.logout}>logout {this.state.user.name}</button>
                    </header>
                    <UpdatesBin fromServer={this.state.fromServer} />
                    <footer>
                        <form onSubmit={this.sendCommand}>
                            <input autoFocus placeholder="type command" onChange={this.inputHandler} name="command" value={this.state.command} type="text">{this.value}</input>
                            <button onClick={this.sendCommand}>submit</button>
                        </form>
                    </footer>
                </GameDiv>
            )
        } else {
            return <h1>loading...</h1>
        }
    }
}

const GameDiv = styled.div`
    background: black;
    color: #008000;
    height: 90%;
    width: 99%;
    text-align: center;
    margin-left: 0.5%;
    header{
        display: flex;
        flex-direction: row;
        align-items: center;
        button{
            color: #008000;
            border: 1px solid #008000;
            background: black;
            width: 25%;
            height: 25%;
            &:hover{
                    background: #008000;
                    color: black;
                }
        }
        h1 {
            width: 100%;
        }
    }
    footer{
        display: flex;
        flex-direction: row;
        height: 35px;
        box-sizing: border-box;
        padding: 1px;
        position: absolute;
        bottom: 30px;
        width: 99%;
        form {
            border: 1px solid #008000;
            width: 100%;
            box-sizing: border-box;
            height: 30px;
            display: flex;
            flex-direction: row;
            input{
                margin: 1px;
                width: 70%;
                background: black;
                color: #008000;
                border: 1px solid #008000;
                &::-webkit-input-placeholder {
                    color: #00ff00;
                }
                &:focus{
                    border: 2px solid #008000;
                    color: #008000;
                    outline: none;
                    background: #008000;
                    color: black;
                    &::-webkit-input-placeholder {
                        color: black
                    }
                }
                &:hover{
                    background: #008000;
                    color: black;
                    &::-webkit-input-placeholder {
                        color: black
                    }
                }
            }
            button {
                margin: 1px;
                color: #008000;
                border: 1px solid #008000;
                background: black;
                width: 30%;
                padding: 0;
                &:hover{
                    background: #008000;
                    color: black;
                }
            }
        }
    }
`