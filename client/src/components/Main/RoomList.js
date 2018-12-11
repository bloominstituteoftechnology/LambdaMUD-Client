import React, { Fragment } from 'react';

import Room from './Room';

function RoomList(props) {
    if (props.rooms === undefined ) return null;
    return <Fragment>{props.rooms.map(room => <Room key={room.id.id} room={room} players={props.players}/>)}</Fragment>;
};

export default RoomList;