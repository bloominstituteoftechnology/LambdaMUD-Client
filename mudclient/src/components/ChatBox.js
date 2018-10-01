import React, { Component } from 'react';
import './components.css';
import Pusher from 'pusher-js';


class ChatBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
          chats: [],
        }
    }

componentDidMount() {
 const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
   cluster: process.env.REACT_APP_PUSHER_CLUSTER,
   encrypted: true,
   forceTLS: true
 });
 Pusher.logToConsole = true;
 const channel = pusher.subscribe(`p-channel-${this.props.user.uuid}`);
 console.log('channel', channel)
 channel.bind('broadcast', data => {
   console.log('data', data);
   this.setState({
     chats: [...this.state.chats, data]
   });
 });
}
    render() {
       
        return (
            <div className='display-chat-room'>
               
               <p className='display-player-text'>
               {this.state.chats.map(chat => {
                return <p>{chat.message}</p>
               })}</p>
            </div>
        );
    }
}

export default ChatBox;