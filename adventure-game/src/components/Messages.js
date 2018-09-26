import React from "react";

const Messages = props => {
  return (
    <div>
      <strong>{props.message.name}: </strong>
      {props.message.message}
    </div>
  );
};

export default Messages;
