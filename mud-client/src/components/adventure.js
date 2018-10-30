import React, { Component } from 'react';
import axios from 'axios';

export default class Adventure extends Component {
  state = {
    title: '',
    description: '',
    name: '',
    uuid: '',
    players: []
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
          players: res.data.players
        });
      })
      .catch(err => {
        console.error('Axios Error: ', err);
      });
  };

  componentDidMount() {
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
    console.log('adventure');
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
      </div>
    );
  }
}
