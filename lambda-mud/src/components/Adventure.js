import React from 'react';
import {initializeGame, logoutUser} from './../actions/index';
import {connect} from 'react-redux';
import Styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import Pusher from 'pusher-js';


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

    }

    logOut = () => {
        this.props.logoutUser(this.props.history)
    }

//sends initialize request to server upon component mount
    componentDidMount() {
        this.props.initialize()
    }
    
    render() {
        return (
            <Container>
                <h3>Adventure</h3>
                <h5>{this.props.room}</h5>
                <p>{this.props.description}</p>
                <p>Players:{this.props.players.map(player => {
                    return ` ${player}, `
                })}</p>

                <input 
                    type='textbody'
                    placeholder='Type a command'
                />
                <button>Enter</button>
                <button onClick={this.logOut}>Leave game</button>

            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
      user: state.game.user,
      room: state.game.current_room,
      description: state.game.room_description,
      players: state.game.players
    }
  }
  
  const mapActionsToProps = {
    initialize: initializeGame,
    logoutUser: logoutUser
  }

  Adventure = withRouter(Adventure)
  export default connect( mapStateToProps, mapActionsToProps)(Adventure);


