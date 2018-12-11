import React from 'react';

function UserRoom(props) {
    return (
        <div>
            <p>{props.room.description}</p>
        </div>
    )
};

export default UserRoom;