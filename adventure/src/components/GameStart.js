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
      message: ''
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
          <img src={chatbubble} width="35" height="35" />
          Adventure
          </p>
        </div>
        <div className="Server_info">
          <div className="User_Name">
            <h2>{this.state.player.name}</h2>
          </div>
          <h4>Location: {this.state.player.title}</h4>
          <h4>Description: {this.state.player.description}</h4>
          <h5>{this.state.player.error_msg}</h5>
          <h4>Players In This Room: {this.state.player.players.map(player => {
            return <li key={Math.random()}>{player}</li>
            })}</h4>
        </div>
        <br />
        <div className="Directional_Keys">
          <Button direction='n' onClick={this.charMove} outline color="primary">N</Button> 
          <Button direction='s' onClick={this.charMove} outline color="success">S</Button>
          <Button direction='e' onClick={this.charMove} outline color="warning">E</Button> 
          <Button direction='w' onClick={this.charMove} outline color="danger">W</Button>
        </div>
        <br />
        <form className="Message">
          <Input 
            name='message' 
            onChange={this.handleChange} 
            placeholder='' 
            value={this.state.message}>
          </Input>
          <Button outline color="warning" onClick={this.charSay}>Send</Button>
        </form>
        <br />
        <Link to="/api/login">
          <Button outline color="secondary" onClick={this.handleLogout}>Logout</Button>
        </Link>
      </div>
    )
  }
}

export default Authenticate(GameStart);