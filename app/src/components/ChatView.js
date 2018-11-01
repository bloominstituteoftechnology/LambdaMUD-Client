import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import '../styles/ChatStyles.css';
import MessageView from '../chatviews/MessageView';

class ChatView extends Component {

  state = {
    message:'',
    chats:[],
    name: this.props.data.name,
  }

  componentDidMount(){
    console.log('in chatview: ',this.props.data);
    const pusher = new Pusher('APP_KEY', {
      cluster: 'APP_CLUSTER',
      // encrypted: true
    });
    const channel = pusher.subscribe('chat');
    channel.bind('message', data => {
      this.setState({ chats: [...this.state.chats, data], test: '' });
    });
  }

  // getMessageData () => {
  //   return axios.get()
  // }

  onFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.message);
  }

  sendMessage = () => {
    let payload = {
      username: this.state.name,
      message: this.state.message
    }
    axios.post('https://muddy-screams.herokuapp.com/api/adv/say', payload);
  }

  render(){
    return (
      <div className="chat-view-container">
        <div className="message-thread-container">
          {/* map over messages and player move notifications */}
          {/* <MessageView data={this.} /> */}
        </div>
        <div className="room-input-container">
          <textarea className="chat-input" placeholder="Enter message to room..." onChange={this.onFieldChange} name="message" onChange={this.onFieldChange}></textarea>
          <button className="send-btn" onClick={this.sendMessage}>Send</button>
        </div>
  
      </div>
    )
  }
}

export default ChatView;