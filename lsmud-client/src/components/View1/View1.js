import React from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import './View1.css'

export default class View1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        username: '',
        uuid: '',
      },
      room: {
        title: '',
        description: '',
      },
      players: [],
      command: '',
      error: '',
      message: '',
      messages: [],
    }
    this.pusher = new Pusher('b15ce1ecd7b2ec1c7091', {
      cluster: 'us2'
    });
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillMount = () => {
    const token = localStorage.getItem('token')
    axios
      .get("https://lsmud.herokuapp.com/api/adv/init", {
        headers: {
          "Authorization": `Token ${token}`
        }
      })
      .then(response => {
        console.log('init response: ', response)
        console.log('username', response.data.name)
        this.setState({
          player: {
            username: response.data.name,
            uuid: response.data.uuid,
          },
          room: {
            title: response.data.title,
            description: response.data.description,
          },
          players: response.data.players,
        })
        this.pusher
          .subscribe(`p-channel-${response.data.uuid}`)
          .bind('broadcast', (data) => {
            console.log('data: ', data.message)
            let currentState = this.state.messages.concat(data.message);
            this.setState({
              messages: currentState
            })
          });
      })
      .catch((error) => console.log('init error response: ', error.response))
  }

  handleCommandSubmit = () => {
    const token = localStorage.getItem('token')
    axios
      .post("https://lsmud.herokuapp.com/api/adv/move", {direction: this.state.command}, {
        headers: {
          "Authorization": `Token ${token}`,
        }
      })
      .then(response => {
        console.log('move response: ', response)
        this.setState({
          player: {
            username: response.data.name,
            uuid: response.data.uuid,
          },
          room: {
            title: response.data.title,
            description: response.data.description,
          },
          players: response.data.players,
          error: response.data.error_msg
        })
      })
      .catch((error) => console.log('move error response: ', error.response))       
  }

  handleSaySubmit = (e) => {
    const token = localStorage.getItem('token');
    const message = { message: this.state.message } 
    axios
      .post('https://lsmud.herokuapp.com/api/adv/say', message, {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then(response => {
        console.log('say data: ', response.data)
        console.log('this state message', this.state.message)
        let currentState = this.state.messages
        this.setState({ 
          message: '',
          messages: currentState.concat(this.state.message) 
        })
      })
      .catch(err => console.log(err.response))
  }

  handleCommandChange = e => {
    this.setState({
      command: e.target.value
    })
  }

  handleSayChange = e => {
    console.log('say change ', e.target.value)
    this.setState({
      message: e.target.value
    })
  }

  render() {
    console.log('this state messages ren', this.state.messages)
    console.log('this state message', this.state.message)
    return (
      <div>
        <div className="card bg-dark">
          <div className="card-body">
          <div className="card-header text-left">
            <p className="my-1 text-white"><span className="text-danger">Username: </span>{this.state.player.username}</p>
            <p className="my-1 text-white"><span className="text-danger">Room: </span>{this.state.room.title}</p>
            <p className="my-1 text-white"><span className="text-danger">Description: </span>{this.state.room.description}</p>
          </div>
            <div className="container">
              <div className="row">
                <div className="col-sm-8 text-left text-content text-white">
                  {this.state.messages.map((msg, i) => (
                    <p className="text-white" key={i}>{msg}</p>
                  ))}
                  <p className="text-left text-white">{this.state.error}</p>
                  <div style={{ float:"left", clear: "both" }}
                      ref={(el) => { this.messagesEnd = el; }}>
                  </div>
                </div>
                <div className="col-sm-4 text-content">
                  <p className="text-danger mt-3 mb-1">Players:</p>
                  <ul className="list-group list-group-flush">
                    {this.state.players.map((player, i) => (
                      <li className="list-group-item py-0 bg-dark text-white" key={i}>{player}</li>
                    ))}
                  </ul>
                  <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-dark input-fields">
        {/* Direction input */}
          <div className="input-group mb-3">
            <input 
              type="text"
              name="command" 
              className="form-control" 
              placeholder="Direction (n, e, s, w)" 
              onChange={(e) => this.handleCommandChange(e)} 
            />
            <div className="input-group-append">
              <button 
                className="btn btn-outline-dark px-5 input-button" 
                type="button"
                onClick={() => this.handleCommandSubmit()}
              >
                Send
              </button>
            </div>
          </div>

          {/* Say input */}
          <div className="input-group mb-3">
            <input 
              type="text"
              name="command" 
              className="form-control" 
              placeholder="Say" 
              onChange={(e) => this.handleSayChange(e)} 
            />
            <div className="input-group-append">
              <button 
                className="btn btn-outline-dark px-5 input-button" 
                type="button"
                onClick={() => this.handleSaySubmit()}
              >
                Send
              </button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}