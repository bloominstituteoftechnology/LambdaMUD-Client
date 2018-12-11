import React from 'react';
import UserRoom from './UserRoom';
import NewRoom from './NewRoom';

function Room(props) {
    const room = props.room.id.room;
    return (
        <div>
            {!room ? <UserRoom room={props.room.id} /> : <NewRoom room={props.room.id} players={props.players}/>}
        </div>
    )
};

export default Room;