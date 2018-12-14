import React, { Fragment } from 'react';

/**
 * Displays the room information
 * @param props - Props
 * @returns {*}
 * @constructor
 */
function NewRoom(props) {

    // Render the component
    return (
        <Fragment>
            <h4>{props.room.title}</h4>
            <p>{props.room.description}</p>
            <br></br>
        </Fragment>
    )
};

export default NewRoom;