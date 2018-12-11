import React from "react";

function PlayersInRoom(props) {
  if (props.occupants === 0) {
    return null;
  }
  if (props.occupants === 1) {
    return (
      <div>
        <h3>{props.players} is currently in the room as well</h3>
      </div>
    );
  }

  if (props.occupants === 1) {
    const namesarray = props.players;
    const lastName = props.players.slice(-1)[0];
    const shortenedNames = namesarray.slice(0, -1);
    const loopedNames = shortenedNames.map(function(name) {
      return `${name} `;
    });
    return (
      <div>
        <h3>
          {loopedNames} and {lastName} are currently in the room as well
        </h3>
      </div>
    );
  }

  if (props.occupants > 2) {
    const namesarray = props.players;
    const lastName = props.players.slice(-1)[0];
    const shortenedNames = namesarray.slice(0, -1);
    const loopedNames = shortenedNames.map(function(name) {
      return `${name}, `;
    });
    return (
      <div>
        <h3>
          {loopedNames} and {lastName} are currently in the room as well
        </h3>
      </div>
    );
  }
}

export default PlayersInRoom;
