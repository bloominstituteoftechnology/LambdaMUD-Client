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


// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('df8b759eeb5be923d602', {
  cluster: 'us2',
  forceTLS: true,
});


var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  alert(data.message);
});



const GameBox = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
    height: auto;
    border-radius: 10px;
    background: #FECD65;
`;

const Container = Styled.div`
    display: flex;
    justify-content: space-around;
    margin: 20px;
`;

const KeyBox = Styled.div`
    display: flex;
    justify-content: center;
    width: 150px;
    height: 50px;
    border-radius: 10px;
    background: #88A75D
`;

const Banner = Styled.div`
    display: flex;
    justify-content: space-between;
    background: #29567E
    width: 100%;
    height: 50px;
    border-radius: 10px 10px 0 0;
    
`;

const Room = Styled.h3`
    color: white;
    margin: 10px;
`;

const Text = Styled.div`
    padding: 10px;
`;

const CommandPrompt = Styled.input`
    width: 100%;
`;

const FormContainer = Styled.form`
    display: flex;
    margin: 10px;;
`;

const Button = Styled.button`
    width: 100px;
    height: 30px;
    align-self: center;
    margin: 10px;
    background: #88A75D
`;



class Adventure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            command: '',
            moveCommand: '',
            sayCommand: '',
            showKey: false,
            uuid: this.props.uuid
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

    dropDown = () => {
        this.setState({showKey: !this.state.showKey})
    }

//sends initialize request to server upon component mount
    componentDidMount() {
        this.props.initialize();

var channel = pusher.subscribe(`p-channel-${this.props.uuid}`);
channel.bind('broadcast', function(data) {
  alert(data.message);
});
    }
    
    render() {
        return (
            <Container>
                <GameBox>
                    <Banner>
                        <Room>{this.props.room}</Room>
                        <Button onClick={this.logOut}>Leave game</Button>
                    </Banner>
                    <Text>
                        <p>{this.props.description}</p>
                        <p>Players:{this.props.players.map(player => {
                            return ` ${player}, `
                        })}</p>
                        {this.props.error}
                        {this.props.message ? alert(this.props.message): null}
                    </Text>
                   
                        <FormContainer onSubmit={this.newCommand}>
                            <CommandPrompt 
                            type='textbody'
                            placeholder='Type a command'
                            value={this.state.command}
                            onChange={this.handleChange}
                            />
                            <Button onClick={this.newCommand}>Submit</Button>
                        </FormContainer>


                </GameBox>
                <KeyBox onMouseOver={this.dropDown}>
                    <h4>Command Key</h4>
                    {this.state.showKey ? <Key /> : null}
                </KeyBox>
            </Container>
        )
    }
}


const mapStateToProps = state => {
    return {
      user: state.game.user,
      room: state.game.current_room,
      description: state.game.room_description,
      players: state.game.players,
      uuid: state.game.uuid,
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


