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
    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('MUD') 
        this.props.history.push('/')
    }

    render(){
        console.log(this.state)
        if(this.state.user){
            return (
                <GameDiv> 
                    <header>
                        <h1>MUD</h1>
                        <button onClick={this.logout}>logout {this.state.user.name}</button>
                    </header>
                    <div className="updates-bin">
                        {this.state.fromServer.length > 0 ? this.state.fromServer.map((update, i )=> {
                            return (
                                <div className='event'>
                                    <div className="updates-left">
                                        <p>{moment(update.time).format('LLL')}</p>
                                        {update.message || update.response ? 
                                            <span>{update.message}{update.response}</span> : 
                                            <React.Fragment>
                                                <p>{update.title}</p> 
                                                {update.players && update.players.length > 0 ?
                                                    <span> with {update.players.map(player => <span>{player}, </span>)}</span> :
                                                    null}
                                            </React.Fragment>
                                        }
                                    </div>
                                    <div key={i} className="updates-right">
                                        <p>{update.description}</p>
                                    </div>
                                </div>
                            )
                        }) : null}
                    </div>
                    <footer>
                        <form onSubmit={this.sendCommand}>
                            <input autoFocus placeholder="type command" onChange={this.inputHandler} name="command" value={this.state.command} type="text">{this.value}</input>
                        </form>
                        <button onClick={this.sendCommand}>submit</button>
                    </footer>
                </GameDiv>
            )
        } else {
            return null
        }
    }
}

const GameDiv = styled.div`
    background: black;
    color: green;
    height: 90%;
    header{
        display: flex;
        flex-direction: row;
        align-items: center;
        button{
            color: green;
            border: 1px solid green;
            background: black;
            width: 25%;
            height: 25%;
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
        form {
            width: 100%;
            box-sizing: border-box;
            height: 30px;
            input{
                width: 100%;
                background: black;
                color: green;
                border: none;
                &:focus{
                    border: 1px solid green;
                }
            }
        }
        button {
            color: green;
            border: 1px solid green;
            background: black;
            width: 25%;
            height: 30px;
        }
    }
    .updates-bin{
        overflow: auto;
        height: 70vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        .event{
            display: flex;
            flex-direction: row;
            align-items: space-between;
            .updates-left{
                border: 1px solid green
                min-width: 35%;
                display: flex;
                flex-direction: column;
                align-items: flex-start
            }
            .updates-right{
                width: 100%;
                border: 1px solid green
            }
        }
    }
`