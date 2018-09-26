import React from 'react';
import Authenticate from './Authenticate';
import axios from 'axios';
import { Button } from 'reactstrap';

class GameStart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.props.history.push('/api/login')
    alert('Logged Out!!');
  }

  componentDidMount() {
    axios
      .get('https://adventure-.herokuapp.com/api/adv/init', {
        headers: {
          "Authorization": 'Token ' + localStorage.getItem('key')
        }
      })
      .then(response => {
        this.setState({player: response.data})
      })
      .catch(error => {
        console.log(error.response)
      });
  };

  charMove = e => {
    const direction = e.target.getAttribute('direction')
    axios
      .post('https://adventure-.herokuapp.com/api/move', {
        headers: {
          "Authorization": 'Token ' + localStorage.getItem('key'),
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
      <div classname="GameStart">
        <p className="GameStart_Adventure">Adventure</p>
        <h2>{this.state.player.name}</h2>
        <h2>{this.state.player.title}</h2>
        <h2>{this.state.player.description}</h2>
        <h3>{this.state.player.uuid}</h3>
        <h3>{this.state.player.error_msg}</h3>
        <h2>Players: {this.state.player.players}</h2>
        <Button direction='n' onClick={this.charMove} outline color="primary">North</Button> 
        <Button direction='s' onClick={this.charMove} outline color="success">South</Button>
        <Button direction='e' onClick={this.charMove} outline color="warning">East</Button> 
        <Button direction='w' onClick={this.charMove} outline color="danger">West</Button>
      </div>
    )
  }
}

export default Authenticate(GameStart);