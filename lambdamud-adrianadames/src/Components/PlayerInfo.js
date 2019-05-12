import React from 'react';

const PlayerInfo = props => {
    return (
        <div style = {{'background':'1px solid green'}}>
            Player Name: {props.playerName}
            <br/>
            Player UUID: {props.playerUUID}
        </div>
    )
}

export default PlayerInfo;