import React from 'react';

/**
 * Renders the Pusher messages
 * @param props
 * @returns {*}
 * @constructor
 */
function UserRoom(props) {

    // Render the component
    return (
        <div>
            <p>{props.room.description}</p>
            <br></br>
        </div>
    )
};

export default UserRoom;