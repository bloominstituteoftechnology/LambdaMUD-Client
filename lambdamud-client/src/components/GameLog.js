import React from 'react';

function GameLog(props) {
    return (
        <div className="game-text" >
            <h3>Current Room</h3>
            <p>{props.room_name}</p>
            <h3>Description</h3>
            <p>{props.text}</p>
            <h3>Adventurers Present</h3>
            <ul>
                {props.players.map(player => {
                    return (
                        <li>{player}</li>
                    )
                })}
            </ul>
        </div>
    );
}


export default GameLog
