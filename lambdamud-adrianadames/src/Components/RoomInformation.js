import React from 'react';

const RoomInformation = props => {
    return (
        <div>
            <div>
                Room Title: {props.playerCurrentRoomTitle}
            </div>
            <div>
                Room Description: {props.playerCurrentRoomDescription}
            </div>
            <div>
                {console.log('players in room:', props.playerCurrentRoomPlayerNames)}
                Players in room: {props.playerCurrentRoomPlayerNames}
            </div>


            {/* <div>
                Players in Room:
                <ul>
                    {props.playerCurrentRoomPlayerNames.map(player => {
                        return (
                            <li key = {props.playerCurrentRoomPlayerNames.indexOf(player)}>
                                {player}
                            </li>) 
                    })}
                </ul>
            </div> */}
        </div>
    )
}

export default RoomInformation;
