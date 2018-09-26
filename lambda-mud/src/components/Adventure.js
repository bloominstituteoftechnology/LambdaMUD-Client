import React from 'react';
import {initializeGame, 
    logoutUser, 
    changeRoom, 
    speak} from './../actions/index';
import {connect} from 'react-redux';
import Styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import Pusher from 'pusher-js';
import Key from './Key';


const Container = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    height: auto;
    border: 1px solid gray;
    border-radius: 10px;
`;

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('df8b759eeb5be923d602', {
  cluster: 'us2',
  forceTLS: true
});

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  alert(data.message);
});


class Adventure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            command: '',
            moveCommand: '',
            sayCommand: '',
        }
    }

    logOut = () => {
        this.props.logoutUser(this.props.history)
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({command: event.target.value})
    }

    newCommand = (event) => {
        event.preventDefault();
        if (this.state.command.includes('say')) {
            let say = this.state.command.replace('say ','')
            let request =  {'message': say}
            this.props.say(request)
        }
        if (this.state.command.includes('move')) {
            let move = this.state.command.replace('move ','')
            console.log(move);
            let request = {'direction': move}
            this.props.move(request)
        }

    }

//sends initialize request to server upon component mount
    componentDidMount() {
        this.props.initialize()
    }
    
    render() {
        return (
            <div>
            <Container>
                <h3>Adventure</h3>
                <h5>{this.props.room}</h5>
                <p>{this.props.description}</p>
                <p>Players:{this.props.players.map(player => {
                    return ` ${player}, `
                })}</p>
                {this.props.error}
                {this.props.message ? alert(this.props.message): null}
                <form onSubmit={this.newCommand}>
                <input 
                    type='textbody'
                    placeholder='Type a command'
                    value={this.state.command}
                    onChange={this.handleChange}
                />
                <button onClick={this.newCommand}>Submit</button>
                </form>
                <button onClick={this.logOut}>Leave game</button>

            </Container>
            <Key />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      user: state.game.user,
      room: state.game.current_room,
      description: state.game.room_description,
      players: state.game.players,
      error: state.game.error_msg,
      message: state.game.message
    }
  }
  
  const mapActionsToProps = {
    initialize: initializeGame,
    logoutUser: logoutUser,
    move: changeRoom,
    say: speak
  }

  Adventure = withRouter(Adventure)
  export default connect( mapStateToProps, mapActionsToProps)(Adventure);


