import React from 'react';
import Authenticate from './Authenticate';
import axios from 'axios';
import { Button, Input } from 'reactstrap';
import Pusher from 'pusher-js';
import { Link } from 'react-router-dom';
import chatbubble from './images/chatbubble.png'

var pusher = new Pusher('256c71d4c75bd50bba8d', {
  cluster: 'us2'
});

class GameStart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: { 
        name:'', 
        title:'', 
        description:'', 
        uuid:'', 
        error_msg:'',
        players: [],
      },
      message: '',
      messages: []
    }
  }

  handleLogout = () => {
    localStorage.removeItem('key')
    alert('Logged Out!!');
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  componentDidMount() {
    axios
      .get('https://adventure-.herokuapp.com/api/adv/init', {
        headers: {
          Authorization: 'Token ' + localStorage.getItem('key'),
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        this.setState({player: response.data})
        var channel = pusher.subscribe('p-channel-' + response.data.uuid);
          channel.bind('broadcast', function(data) {
            alert(JSON.stringify(data));
        });
      })
      .catch(error => {
        console.log(error.response)
      });
  };

  charMove = (e) => {
    this.setState({ messages: [] })
    const direction = e.target.getAttribute('direction')
    axios
      .post('https://adventure-.herokuapp.com/api/adv/move/', {"direction": direction}, {
        headers: {
          Authorization: 'Token ' + localStorage.getItem('key'),
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        this.setState({player: response.data})
      })
      .catch(error => {
        console.log(error)
      })
  }

  charSay = (e) => {
    e.preventDefault()
    this.state.messages.push(this.state.message)
    this.setState({message: ''})
    axios
      .post('https://adventure-.herokuapp.com/api/adv/say/', {"message": this.state.message}, {
        headers: {
          Authorization: 'Token ' + localStorage.getItem('key'),
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="GameStart">
        <div>
          <p className="GameStart_Adventure">
          Lambda MUD Adventure
          </p>
        </div>
        <div className="Server_info">
          <div className="User_Name">
            <h3>Welcome, {this.state.player.name}!</h3>
          </div>
          <h4>Location: {this.state.player.title}</h4>
          <h4>Description: {this.state.player.description}</h4>
          <h5>{this.state.player.error_msg}</h5>
          <h4>Players In This Room: {this.state.player.players.map(player => {
            return <li className="user-list" key={Math.random()}>{player}</li>
            })}</h4>
        </div>
        <br />
        <div className="Directional_Keys">
          <button direction='n' onClick={this.charMove} className="directional-button-N">N</button> 
          <button direction='s' onClick={this.charMove} className="directional-button-S">S</button>
          <button direction='e' onClick={this.charMove} className="directional-button-E">E</button> 
          <button direction='w' onClick={this.charMove} className="directional-button-W">W</button>
        </div>
        <br />
        <div className='Chatlog'>
          {this.state.messages ? 
            this.state.messages.map((message) => {
              return (
                <div className="player_message">
                  {this.state.player.name}: {message}
                </div>)
            }) : null}
        </div>
        <form className="Message">
          <Input 
            className="input"
            name='message' 
            onChange={this.handleChange} 
            placeholder='type message here...' 
            value={this.state.message}>
          </Input>
          <button className="login-button" onClick={this.charSay}>Send</button>
        </form>
        <Link to="/api/login">
          <button className="login-button" onClick={this.handleLogout}>Logout</button>
        </Link>
      </div>
    )
  }
}

export default Authenticate(GameStart);