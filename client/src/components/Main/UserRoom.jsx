import React from 'react';

function UserRoom(props) {
    return (
        <div>
            <p>{props.room.description}</p>
            <br></br>
        </div>
    )
};

export default UserRoom;