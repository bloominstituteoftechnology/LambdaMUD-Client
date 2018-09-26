import React from 'react';
import Authenticate from './Authenticate';
import axios from 'axios';
import '../App.css';

class Game extends React.Component {
  state = {
    uuid: "",
    name: "",
    title: "",
    description: "",
    players: []
  }

  componentDidMount() {
    const key = localStorage.getItem("key")
    axios
      .get('https://lambda-mud.herokuapp.com/api/adv/init/', { headers: { Authorization: `Token ${key}` } })
      .then(response => {
        this.setState({
          uuid: response.data.uuid,
          name: response.data.name,
          title: response.data.title,
          description: response.data.description,
          players: response.data.players
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div>{this.state.name}</div>
        <div>{this.state.title}</div>
        <div>{this.state.description}</div>
        <div>{this.state.players.map(player => {
          return <li key={Math.random()}>{player.name}</li>
        })}</div>
        <button onClick={this.props.logout}>Log out</button>
      </div>
    );
  }
}

export default Authenticate(Game);
