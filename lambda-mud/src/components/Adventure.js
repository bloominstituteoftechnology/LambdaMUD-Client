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
import {GameBox, 
    Container, 
    Banner, 
    Title, 
    Text, 
    CommandPrompt, 
    FormContainer, 
    Button} from '../Styles';


// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

/*var pusher = new Pusher('df8b759eeb5be923d602', {
  cluster: 'us2',
  forceTLS: true,
});


var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  alert(data.message);
});*/




const KeyDD = Styled.div`
    display: flex;
    justify-content: center;
    width: 150px;
    height: 50px;
    border-radius: 10px;
    background: #88A75D;
    @media(max-width: 400px) {
        width: 90%
    }
`;

const KeyBox = Styled.div `
    position: relative;
    display: block;
    top: 30px;
    margin: none;
`;

const KeyHead = Styled.h4 `
    position: fixed;
`;

class Adventure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            command: '',
            moveCommand: '',
            sayCommand: '',
            showKey: false,
            uuid: this.props.uuid,
            loops: 0
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
            this.setState({command: ''})
        }
        if (this.state.command.includes('move')) {
            let move = this.state.command.replace('move ','')
            console.log(move);
            let request = {'direction': move}
            this.props.move(request)
            this.setState({command: ''})
        }

    }

    dropDown = () => {
        this.setState({showKey: !this.state.showKey})
    }

//sends initialize request to server upon component mount
    componentDidMount() {
        this.props.initialize();

    }


    
    render() {
        return (
            <Container game>
                <GameBox>
                    <Banner>
                        <Title>{this.props.room}</Title>
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
                <KeyDD onClick={this.dropDown}>
                    <KeyHead>Command Key</KeyHead>
                    {this.state.showKey ?<KeyBox> <Key /></KeyBox> : null}
                </KeyDD>
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


