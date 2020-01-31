import React from 'react';

const PlayerInfo = props => {
    return (
        <div>
            Logged in as: {props.playerName}
            <br/>
        </div>
    )
}

export default PlayerInfo;