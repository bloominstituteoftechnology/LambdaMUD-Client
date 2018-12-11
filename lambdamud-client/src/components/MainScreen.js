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
        this.setState({ uuid: response.data.uuid, name: response.data.name, title: response.data.title, description: response.data.description, players: response.data.players });
      })
      .catch(err => {
        console.log(err.response);
      });
  }
  
  render() {
    const playersArray = this.state.players.slice();
    
    return(
    <div>
      <h1>Main Screen</h1>
        <p>{this.state.name}</p>
        <p>{this.state.title}</p>
        <p>{this.state.description}</p>
      
      {playersArray.map((player,index) => <div className={"players"} key={index} player={player} >
            <p>{player}</p>
          </div>)}
       

    </div>
    );
  }

}

export default MainScreen;