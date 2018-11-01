import React from 'react';
import '../styles/ChatStyles.css';


const MessageView = (props) => {
  console.log(props);
  return (
    <div  className="player-msg-container">
      <div className="player-name">{props.name} : </div>
      <div className="player-msg">{props.message}</div>
    </div>
  )
}

export default MessageView;