import React from 'react';

const RoomInfo = props => {
    return (
        <div>
            <div>
                Room Title: {props.roomTitle}
            </div>
            <div>
                Room Description: {props.roomDescription}
            </div>
            <div>
                {console.log('players in room:', props.namesOfPlayersInRoom)}
                Players in room: {props.namesOfPlayersInRoom}
            </div>
        </div>
    )
}

export default RoomInfo;
