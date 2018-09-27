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
    error_msg: "",
    chatString: "",
    history: [],
  }

  componentDidMount = () => {
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
        }, () => this.updateHistory());
      })
      .catch(err => console.log(err));

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    const code = e.keyCode;
    const mappings = { 37: 'w', 38: 'n', 39: 'e', 40: 's' };
    if (code in mappings) {
      const direction = mappings[code];
      this.handleMove(direction);
    }
  }

  handleMove = (direction) => {
    const key = localStorage.getItem("key")
    axios
    .post('https://lambda-mud.herokuapp.com/api/adv/move/', { "direction": direction }, {
        headers: {
          Authorization: `Token ${key}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        this.setState({
          name: response.data.name,
          title: response.data.title,
          description: response.data.description,
          players: response.data.players,
          error_msg: response.data.error_msg
        }, () => this.updateHistory());
      })
      .catch(err => console.log(err));
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChatSubmit = e => {

  }

  updateHistory = () => {
    const history = this.state.history;
    const newHistoryItem = {
      title: this.state.title,
      description: this.state.description,
      players: this.state.players
    };
    history.unshift(newHistoryItem)
    this.setState({ history: history });
  }

  render() {
    return (
      <div className="game-container">
        <div className="name-and-logout-container">
          <div className="username">{this.state.name}</div>
          <div className="directions">Move: &uarr; &darr; &larr; &rarr;</div>
          <div onClick={this.props.logout} className="logout">log out</div>
        </div>
        <div className="history-and-text-input-container">
          <div className="history-container-container">
            <div className="history-container">
              {this.state.history.map(historyItem => {
                return (
                  <div key={Math.random()} className="history-item">
                    <div className="title">{historyItem.title}</div>
                    <div className="description">{historyItem.description}</div>
                    <div className="players">{historyItem.players.join(", ")}</div>
                  </div>)
              })}
            </div>
          </div>
          <div className="text-input-container">
            <form onSubmit={this.handleChatSubmit}>
              <input placeholder="Talk to other players"
                     name="chatString"
                     value={this.state.chatInput}
                     onChange={this.handleInputChange} />
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Authenticate(Game);
