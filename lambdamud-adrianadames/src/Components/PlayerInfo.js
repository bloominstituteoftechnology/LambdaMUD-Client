import React from 'react';

const PlayerInfo = props => {
    return (
        <div style = {{'background':'1px solid green'}}>
            Logged in as player: {props.playerName}
            <br/>
            Player UUID: {props.playerUUID}
        </div>
    )
}

export default PlayerInfo;