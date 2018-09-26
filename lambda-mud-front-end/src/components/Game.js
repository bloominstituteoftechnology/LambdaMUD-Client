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
    players: [],
    history: [],
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

  // updateHistory() {
  //   const update =
  // }

  render() {
    return (
      <div className="game-container">
        <div className="name-and-logout-container">
          <div>{this.state.name}</div>
          <div onClick={this.props.logout} className="logout">log out</div>
        </div>
        <div className="history-and-text-input-container">
          <div className="history-container">{this.state.history}</div>
          <div className="text-input-container">
            <form>
              <input></input>
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Authenticate(Game);
