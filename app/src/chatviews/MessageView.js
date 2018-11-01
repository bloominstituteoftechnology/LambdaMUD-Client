import React from 'react';
import '../styles/ChatStyles.css';


const MessageView = (props) => {
  console.log("in msgvu >>> ",props);
  return (
    <div  className="player-msg-container">
      <div className="player-name">{props.data.username}: </div>
      <div className="player-msg">{props.data.message}</div>
    </div>
  )
}

export default MessageView;