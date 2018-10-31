import React, { Component } from 'react';
import axios from 'axios';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      chat: []
    };
  }

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

  render() {
    return (
      <div className="chat-box">
        <div>
          <h5>Chat: </h5>
          {this.state.chat.map((data, index) => (
            <p key={index}>
              {data.username} says {data.message}
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
    );
  }
}

export default Chat;
