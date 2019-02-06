import React from "react";
const MudActions = props => (
  <div>
    <p>{props.data.title}</p>
    <p>{props.data.description}</p>
    <p>
      {props.data.players.length > 0
        ? `An Adventure is here with you by the name of: 
        ${props.data.players.join(", ")}`
        : null}
    </p>
  </div>
);
export default MudActions;
