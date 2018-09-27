import React from 'react';
import Authenticate from './Authenticate';
import axios from 'axios';
import { Button } from 'reactstrap';
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
      player: { name:'', title:'', description:'', uuid:'', error_msg:'' },
      name: '',
      title: '',
      description: '',
      players: [],
      error_msg: '',
      uuid:''
    }
  }

  handleLogout = () => {
    localStorage.removeItem('key')
    alert('Logged Out!!');
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
          <h2>{this.state.player.title}</h2>
          <h2>{this.state.player.description}</h2>
          <h4>{this.state.player.uuid}</h4>
          <h5>{this.state.player.error_msg}</h5>
          <h2>Players In This Room: {this.state.player.players}</h2>
        </div>
        <br />
        <div className="Directional_Keys">
          <Button direction='n' onClick={this.charMove} outline color="primary">N</Button> 
          <Button direction='s' onClick={this.charMove} outline color="success">S</Button>
          <Button direction='e' onClick={this.charMove} outline color="warning">E</Button> 
          <Button direction='w' onClick={this.charMove} outline color="danger">W</Button>
        </div>
        <br />
        <br />
        <Link to="/api/login">
          <Button outline color="secondary" onClick={this.handleLogout}>Logout</Button>
        </Link>
      </div>
    )
  }
}

export default Authenticate(GameStart);