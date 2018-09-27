import React from "react";
import "./HomePage.css";

const Messages = props => {
  return (
    <div className="messages">
      <strong>{props.message.name} </strong>
      {props.message.message}
    </div>
  );
};

export default Messages;
