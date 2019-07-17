import React from 'react';

const PlayerInfo = props => {
    return (
        <div>
            Logged in as: {props.playerName}
            <br/>
            {/* Player UUID: {props.playerUUID} */}
        </div>
    )
}

export default PlayerInfo;