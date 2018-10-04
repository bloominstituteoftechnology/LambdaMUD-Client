import React from 'react';

const RoomInformation = props => {
    return (
        <div>
            <div>
                Room Name: {props.currentRoomName}
            </div>
            <div>
                Room Description: {props.currentRoomDescription}
            </div>

            <div>
                Players in Room:
                <ul>
                    {props.playersInRoom.map(player => {
                        return (
                            <li>
                                {player}
                            </li>) 
                    })}
                </ul>
            </div>
        </div>
    )
}

export default RoomInformation;