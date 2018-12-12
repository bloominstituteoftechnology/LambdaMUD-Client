import React from 'react';
import UserRoom from './UserRoom';
import NewRoom from './NewRoom';

/**
 * Renders each element in the room's array to a NewRoom or UserRoom component to display to the user
 * @param props - Props
 * @returns {*}
 * @constructor
 */
function Room(props) {
    const room = props.room.id.room;

    // Render the component
    return (
        <div>
            {!room ? <UserRoom room={props.room.id} /> : <NewRoom room={props.room.id} players={props.players}/>}
        </div>
    )
};

export default Room;