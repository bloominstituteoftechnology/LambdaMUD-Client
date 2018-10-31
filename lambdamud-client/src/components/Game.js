import React, {Component} from 'react';
import Authenticate from './Authenticate';
import axios from 'axios';
import Pusher from 'pusher-js';

// In this game file there are functions that , let a user post a message , move to other rooms with arrow keys, show alerts 
// using red and green color. We also see different players , and a chatroom.

class Game extends Component {
    state = {
    name: "",
    title: "",
    description: "",
    players: [],
    inputString: "",
    history: []
    }

    componentDidMount = () => {
        const key = localStorage.getItem("key")
        axios
        .get('https://lambdamud-rd.herokuapp.com/api/adv/init/', { headers: { Authorization: `Token ${key}` } })
      .then(response => {
        this.connectToPusher(response.data.uuid);
        this.setState({
          name: response.data.name,
          title: response.data.title,
          description: response.data.description,
          players: response.data.players
         } , () => this.updateHistory());
      
       }) 
         .catch(err => console.log(err));
     window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate() {
    const history = document.getElementById('history') 
    history.scrollTop = history.scrollHeight; 
  }

  componentWillMount = () => {
    window.removeEventListener('keydown', this.handleKeyDown); 
  }

  connectToPusher = (uuid) => {
    const pusher = new Pusher('02b2c273aa94be6bbe87', { cluster: 'us2', forceTLS: true });
    const channel = pusher.subscribe(`p-channel-${uuid}`, uuid);
    channel.bind('broadcast', data => {
      this.updateHistory(data.message);
    });
  };

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
    .post('https://lambdamud-rd.herokuapp.com/api/adv/move/', { "direction": direction }, {
        headers: {
          Authorization: `Token ${key}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if (response.data.error_msg) {
          this.updateHistory(response.data.error_msg);
        } else {
          this.setState({
            name: response.data.name,
            title: response.data.title,
            description: response.data.description,
            players: response.data.players
          }, () => this.updateHistory());
        }
      })
      .catch(err => console.log(err));
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleMessageSubmit = e => {
    e.preventDefault();
    if (this.state.inputString === "") { return };
    const key = localStorage.getItem("key")
    axios
    .post('https://lambdamud-rd.herokuapp.com/api/adv/say/', { "message": this.state.inputString }, {
        headers: {
          Authorization: `Token ${key}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        this.setState({
          inputString: ""
        }, () => this.updateHistory(response.data.message));
      })
      .catch(err => console.log(err));
  }

  updateHistory = (message=null) => {
    const history = this.state.history;
    let newHistoryItem;
    if (message !== null) {
      newHistoryItem = { message: message };
    } else {
      newHistoryItem = {
        title: this.state.title,
        description: this.state.description,
        players: this.state.players
      };
    }
    history.unshift(newHistoryItem)
    this.setState({ history: history });
  }

  render() {
    const history = this.state.history.slice().reverse();
    return (
      <div className="game-container">
        <div className="name-and-logout-container">
          <div className="username">{this.state.name}<i class="fas fa-user"></i></div>
          <div className="directions">use <i class="fas fa-arrows-alt"></i> keys to move</div>
          <div onClick={this.props.logout} className="logout"><i class="fas fa-sign-out-alt"></i></div>
        </div>
        <div className="history-and-text-input-container">
          <div className="history-container-container">
            <div className="history-container" id="history">
              {history.map(historyItem => {
                if (historyItem['message']) {
                  return (
                    <div key={Math.random()} className="history-item">
                      <div className="message">{historyItem.message}</div>
                    </div>)
                } else {
                return (
                  <div key={Math.random()} className="history-item">
                    <div className="title">{historyItem.title}</div>
                    <div className="description">{historyItem.description}</div>
                    <div className="players">{historyItem.players.join(", ")}</div>
                  </div>)
              }})}
            </div>
          </div>
          <div className="text-input-container">
            <form onSubmit={this.handleMessageSubmit} autoComplete="off">
              <input placeholder="Talk to other players"
                     name="inputString"
                     value={this.state.inputString}
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

    



    