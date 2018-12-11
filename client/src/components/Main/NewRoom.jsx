import React from 'react';

function NewRoom(props) {
    // let str = '';
    // if (props.players.length > 0) {
    //     str = `There are ${props.players.length} people in this room.`
    // }

    return (
        <div>
            <p>{props.room.title}</p>
            <p>{props.room.description}</p>
        </div>
    )
};

export default NewRoom;