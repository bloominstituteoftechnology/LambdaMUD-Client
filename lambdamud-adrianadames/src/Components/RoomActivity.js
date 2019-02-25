import React from 'react';

// if someone enters or leaves the room, update room activity
// if someone says something, update the room activity
// if player leaves to different room, clear old room activity (?)

const RoomActivity = props => {
    return (
        <div>
            Room Activity: 
                <ul>
                    {props.playerCurrentRoomActivity.map(activity => {
                        return(
                            // NOTE: Change how key's generated because if a player does two of the same activity, 
                            // two items on the list will end up having the same key. 
                            <li key = {props.playerCurrentRoomActivity.indexOf(activity)}>
                                {activity}
                            </li>
                        )
                    })}
                </ul>
        </div>
    )
}

export default RoomActivity;