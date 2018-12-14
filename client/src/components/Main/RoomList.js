import React, { Fragment } from 'react';

import Room from './Room';

/**
 * Renders each element into a new Room
 * @param props - Props
 * @returns {*}
 * @constructor
 */
function RoomList(props) {
    // If there are no rooms, return null
    if (props.rooms === undefined ) return null;
    return <Fragment>{props.rooms.map(room => <Room key={room.id.id} room={room} players={props.players}/>)}</Fragment>;
};

export default RoomList;