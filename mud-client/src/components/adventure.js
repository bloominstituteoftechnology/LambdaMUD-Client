import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

export default class Adventure extends Component {
  channel = null;
  state = {
    title: '',
    description: '',
    name: '',
    uuid: '',
    players: [],
    chat: [],
    message: ''
  };

  handleMove = e => {
    const { name } = e.target;
    const token = 'Token ' + localStorage.getItem('jwt');
    console.log(name);
    const reqOptions = {
      headers: {
        Authorization: token
      }
    };

    const data = {
      direction: name
    };
    axios
      .post(
        'https://lambdamud-jp.herokuapp.com/api/adv/move/',
        data,
        reqOptions
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          title: res.data.title,
          description: res.data.description,
          name: res.data.name,
          uuid: res.data.uuid,
          players: res.data.players,
          chat: []
        });
      })
      .catch(err => {
        console.error('Axios Error: ', err);
      });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  speak = e => {
    e.preventDefault();

    const token = 'Token ' + localStorage.getItem('jwt');

    const reqOptions = {
      headers: {
        Authorization: token
      }
    };

    const data = {
      message: this.state.message
    };

    axios
      .post('https://lambdamud-jp.herokuapp.com/api/adv/say/', data, reqOptions)
      .then(response => {
        const chat = this.state.chat.slice();
        chat.push({
          username: response.data.username,
          message: response.data.message
        });
        this.setState({
          chat: chat
        });
      })
      .catch(err => {
        console.error('Axios Error: ', err);
      });
  };

  componentDidMount() {
    Pusher.logToConsole = true;
    const token = 'Token ' + localStorage.getItem('jwt');
    console.log(token);
    const reqOptions = {
      headers: {
        Authorization: token
      }
    };

    axios
      .get('https://lambdamud-jp.herokuapp.com/api/adv/init/', reqOptions)
      .then(res => {
        console.log(res.data);
        const pusher = new Pusher('625b8abf9bed5ec4c3d5', {
          cluster: 'us2'
        });

        this.channel = pusher.subscribe(
          `p-channel-${res.data.uuid}`,
          res.data.uuid
        );

        this.channel.bind('broadcast', response => {
          console.log('Broadcast: ' + JSON.stringify(response));
          let chat = this.state.chat.slice();
          chat.push(response);
          this.setState({ chat: chat });
        });

        this.setState({
          title: res.data.title,
          description: res.data.description,
          name: res.data.name,
          uuid: res.data.uuid,
          players: res.data.players
        });
      })
      .catch(err => {
        console.error('Axios Error: ', err);
      });
  }

  render() {
    return (
      <div>
        <h1>Welcome {this.state.name}</h1>
        <p>
          You're location: {this.state.title}
          <br />
          <br />
          {this.state.description} <br />
          <br />
          {this.state.players.length > 0
            ? 'Other players are here'
            : 'No one else is here'}
        </p>
        <div>
          <h2>Where would you like to go?</h2>
          <button name="n" onClick={this.handleMove}>
            North
          </button>
          <button name="s" onClick={this.handleMove}>
            South
          </button>
          <button name="e" onClick={this.handleMove}>
            East
          </button>
          <button name="w" onClick={this.handleMove}>
            West
          </button>
        </div>
        <div className="chat-box">
          <div>
            <h5>Chat: </h5>
            {this.state.chat.map((data, index) => (
              <p key={index}>
                {data.username ? data.username : ''}{' '}
                {data.username ? ' says ' : ''} {data.message}
              </p>
            ))}
          </div>
          <form onSubmit={this.speak}>
            <div>
              <label>Say something</label>
              <input
                name="message"
                value={this.state.message}
                onChange={this.handleChange}
                type="text"
              />
            </div>

            <div>
              <button type="submit">Speak</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
