import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import '../styles/ChatStyles.css';
import MessageView from '../chatviews/MessageView';

class ChatView extends Component {

  state = {
    message:'',
    chats:[{username: 'Tickler', message:'What?'}],
    name: this.props.data.name,
    uuid: this.props.data.uuid,
    test:'',

  }

  /***
   * let config = {
                headers: {
                    Authorization: `Token ${token}`,
                }
            }
   */

  componentDidMount(){
    const pusher = new Pusher('APP_KEY', {
      cluster: 'mt1',
      forceTLS: true
    });
    
    const channel = pusher.subscribe('p-channel-'+ this.props.data.uuid);
    channel.bind('broadcast', data => {
      console.log("data back from broadcast >> ", data);
      this.setState(
        { 
          chats: [...this.state.chats, data],
        }
      );
    });
    console.log(this.state.chats);
    
  }

  onFieldChange = (e) => {
    if(e.keyCode === 13) {
      console.log(e.keyCode);
      this.sendMessage();
    } else {
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state.message);
    }
  }

  sendMessage = () => {
    let payload = {
      username: this.state.name,
      message: this.state.message,
    }
    console.log(localStorage.getItem("token"));
    axios.post('https://muddy-screams.herokuapp.com/api/adv/say/', payload, 
    {
      headers: {Authorization: `Token ${localStorage.getItem("token")}`}
    })
    .then((res)=>{
      console.log(res.data);
      let nuMsg = this.formatPusherResponse(res.data)
      this.setState(
        { 
          chats: [...this.state.chats, nuMsg],
        }
      );
    })
  }

  formatPusherResponse = (r) => {
    let key = Object.keys(r)
    let val = r[key];
    return {username: key, message: val};
  }

  render(){
    return (
      <div className="chat-view-container">
        <div className="message-thread-container">
        {
          this.state.chats.map((el)=>{
            return <MessageView data={el} />
          })
        }
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