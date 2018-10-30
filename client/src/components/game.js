import React , { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Pusher from 'pusher'
import axios from 'axios'

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
        }
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
        console.log(this.state)
    }
    
    startGame = (e) => {
        e.preventDefault()
        console.log(this.state)
        let userToken = localStorage.getItem('MUD')
        let authHeader = {
            headers: {
                Authorization: `Token ${userToken}`
            }
        }
        console.log(authHeader)
        axios.get('https://lambda-mud-mjk.herokuapp.com/api/adv/init/', authHeader).then(res => {
            console.log(res.data)
            res.data.time = Date.now()
            let temp = this.state.fromServer
            temp.unshift(res.data)
            this.setState({
                fromServer: temp
            })
        }).catch(err => {
            console.log(err.response)
        })
    }

    render(){
        console.log(this.state.fromServer)
        return(
            <GameDiv> 
                <header>
                    <button onClick={this.logout}>logout</button>
                </header>
                <h1>game div</h1>
                <button onClick={this.startGame}>start</button>
                <form onSubmit={this.sendCommand}>
                    <input autoFocus placeholder="type command" onChange={this.inputHandler} name="command" value={this.state.command} type="text">{this.value}</input>

                </form>
                <div className="updates-bin">
                    {this.state.fromServer.length > 0 ? this.state.fromServer.map((update, i )=> {
                        return (
                            <div key={i} className="updates">
                                <span>{update.name}</span>
                                <span>{update.time}</span>
                                <span>{update.title}</span>
                                <span>{update.description}</span>
                            </div>
                        )
                    }) : null}
                </div>
            </GameDiv>
        )
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
        border: 1px solid red;
        overflow: auto;
        max-height: 50vh;
        .updates{
            h6, p{
                color: white;
            }
        }
    }
`