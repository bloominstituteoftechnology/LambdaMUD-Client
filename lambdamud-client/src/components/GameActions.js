import React from "react";
const GameAction = props => (
  <div className="action">
    <p>{props.data.title}</p>
    <p>{props.data.description}</p>
    <p className="green">
      {props.data.players.length > 0
        ? `Players surrounding you include: 
        ${props.data.players.join(", ")}`
        : null}
    </p>
  </div>
);
export default GameAction;
