import React from 'react';
import axios from 'axios';

class MainScreen extends React.Component {
  state = {
    uuid: '',
    name: '',
    title: '',
    description: '',
    players: []
  };

  componentDidMount() {
    const token = localStorage.getItem('token');

    const options = {
      headers: {
        "Authorization": 'Token ' + token
      }
    }

  axios
      .get('https://lambdamud-project-week.herokuapp.com/api/adv/init/', options)
      .then(response => {
        console.log(response);
        this.setState({ uuid: response.data, name: response.data, title: response.data, description: response.data, players: [response.data] });
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  render() {
    return(
    <div>
      <h1>Main Screen</h1>
      {this.state.players.map(player => <div className={"player"} key={player.uuid} player={player} >
        <p>{player.name}</p>
        <p>{player.title}</p>
        <p>{player.description}</p>

    </div>)}
    </div>
    );
  }

}

export default MainScreen;