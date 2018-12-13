import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {initialize, move, say} from '../actions/index';
import Pusher from 'pusher-js';

class Interface extends React.Component {

    componentWillMount = () =>{
        if(localStorage.getItem('jwt')){
            this.gameInit()
        } else {
            this.props.history.push('/login')
        }
    }

    componentDidMount = () =>{
        if(localStorage.getItem('uuid')){
            this.pusherSubscribe();
        }
    }

    componentWillReceiveProps(newProps){
        if(newProps.readout !== this.state.readout){
            let newPaths = this.state.paths;
            newPaths.unshift(newProps.readout);
            this.setState({
                readout: newProps.readout,
                paths: newPaths 
            })
        }
    }

    componentWillUnmount(){
        if(this.channel){
            this.channel.unbind();
            this.pusher.unsubscribe(this.channel);
        }
    }

    constructor(props){
        super(props);
        this.state = {
            readout : this.props.readout,
            paths: [],
            command : '',
            events: []
        }
    }

    updateEvents = data => {
        let newArray = this.state.events.slice(0);
        newArray.unshift(data);
        // window.alert(data.message)
        this.setState({
            events: newArray,
        })
    }

    handleInput = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    gameInit = () =>{
        var token = localStorage.getItem('jwt');
        this.props.initialize(token);
    }

    pusherSubscribe = () =>{
        let uuid = localStorage.getItem('uuid');
        let pusherKey = process.env.REACT_APP_PUSHER_KEY;
        let pusherCluster = process.env.REACT_APP_PUSHER_CLUSTER;
        this.pusher = new Pusher(pusherKey, {
            cluster: pusherCluster,
            encrypted: true,
        })
         
        // subscribes to the current user's channel
        // local room /say will post to this channel, as well as global /shout and private /whisper (not yet functional)
        this.channel = this.pusher.subscribe(`p-channel-${uuid}`);
        this.channel.bind('broadcast', this.updateEvents);
    }

    handleSubmit = event => {
        event.preventDefault();
        // store token for command inputs to server
        let token = localStorage.getItem('jwt');

        // parse movements
        // if(this.state.command === 'n' || this.state.command === 's' || this.state.command === 'e' || this.state.command === 'w'){
        if(this.state.command && this.state.command[0] !== '/'){
            let direction = '';
            switch(this.state.command){
                case 'n':
                    direction = 'n';
                    break
                case 'north':
                    direction = 'n';
                    break
                case 's':
                    direction = 's';
                    break
                case 'south':
                    direction = 's';
                    break
                case 'e':
                    direction = 'e';
                    break
                case 'east':
                    direction = 'e';
                    break
                case 'w':
                    direction = 'w';
                    break
                case 'west':
                    direction = 'w';
                    break
                default:
                    direction = '';
            }
            // call move action
            // let direction = this.state.command;
            this.props.move(token, direction)
            // reset command prompt
            this.setState({
                command: ''
            })
            // parse non-movement commands with '/' prefix
        } else if(this.state.command[0] === '/'){
            let action = this.state.command.split(' ');
            // parse /say action
            if(action[0] === '/say'){
                // remove command activator
                action.shift();
                // join remaining message
                let message = action.join(' ');
                // send message to say action with user token
                this.props.say(token, message);
                this.setState({
                    command: ''
                })
            }
        } else {
            window.alert('Please enter a valid command.')
            // reset command prompt
            this.setState({
                command: ''
            })
        }

        // parse other commands
    }

    render(){

        // handle error messages from server
        let error_msg = <div className='error_msg'></div>
        if(this.state.readout.error_msg){
            error_msg = <div className='error_msg'>{this.state.readout.error_msg}</div>
        } else {
            error_msg = <div className='error_msg'></div>
        }

        // console.log(this.state.readout)
        let players = []
        if(this.state.readout.players){
            players = this.state.readout.players.join(', ')
        }
        // conditionally render active users

        return(
            <div className = 'interface-container'>
            <div className = 'readout-container'>
            <div className = 'paths' id = 'paths_id'>
            {this.state.paths.map(path => (
                <span key = {path.timestamp} className = 'path-log'>
                    <h2>{path.title}</h2>
                    <p>{path.description}</p>
                </span>)
            )}
            </div>

            {/* <h2>{this.state.readout.title}</h2>
            <p>{this.state.readout.description}</p>
             */}
            
            
            <div className = 'command-container'>
            <form onSubmit={this.handleSubmit}>
            <input type = 'text' name='command' value={this.state.command} onChange={this.handleInput} placeholder='Input Commands Here'></input>
            <button type = 'submit'>Send</button>
            </form>
            </div>
            
            {error_msg}
            </div>

            <div className = 'chatbox-container'>
            <h2>Chatbox</h2>
            <div className = 'active-players'>
            <span>Players in room: {players}</span>
            </div>
            <div className = 'chatbox'>
            {this.state.events.map(event => {
                return <div className = 'chat-message' key = {event.timestamp}>{event.message}</div>
            })
            }
            </div>
            </div>
            
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        readout: state.readout
    }
}

export default withRouter(connect(mapStateToProps, {
    initialize,
    move,
    say,
})(Interface));