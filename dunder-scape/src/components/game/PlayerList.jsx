import React from 'react';

const PlayerList = (props) => {
    return (<ul>
        {props.players.map((player) => {
            return <li key = {player}>{player}</li>
        })}
    </ul>)
}
 
export default PlayerList;