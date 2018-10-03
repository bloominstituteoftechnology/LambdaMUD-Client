import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

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
    }
    this.pusher = new Pusher('b15ce1ecd7b2ec1c7091', {
      cluster: 'us2'
    });
  }

  componentDidMount = () => {
    const token = localStorage.getItem('token')
    axios
      .get("https://lsmud.herokuapp.com/api/adv/init", {
        headers: {
          "Authorization": `Token ${token}`
        }
      })
      .then(response => {
        console.log('init response: ', response)
        this.setState({
          player: {
            username: response.data.username,
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
          .bind('broadcast')
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
            username: response.data.username,
            uuid: response.data.uuid,
          },
          room: {
            title: response.data.title,
            description: response.data.description,
          },
          players: response.data.players,
        })
      })
      .catch((error) => console.log('move error response: ', error.response))       
  }

  handleCommandChange = e => {
    this.setState({
      command: e.target.value
    })
  }

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className="col-sm-8">
                  <h3 className="text-danger">{this.state.room.title}</h3>
                  <p>{this.state.room.description}</p>
                </div>
                <div className="col-sm-4">
                  <h3 className="text-danger">Players</h3>
                  <ul className="list-group list-group-flush">
                    {this.state.players.map(player => (
                      <li className="list-group-item">{player}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

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
              className="btn btn-outline-dark px-5" 
              type="button"
              onClick={() => this.handleCommandSubmit()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}