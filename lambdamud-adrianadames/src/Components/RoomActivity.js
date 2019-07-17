import React from 'react';

// if someone enters or leaves the room, update room activity
// if someone says something, update the room activity
// if player leaves to different room, clear old room activity (?)

const RoomActivity = props => {
    console.log('props: ', props)
    return (
        <div>
            Room Activity: 
                <ul>
                    {props.roomActivity.map(activity => {
                        return(
                            // NOTE: Change how key's generated because if a player does two of the same activity, 
                            // two items on the list will end up having the same key. 
                            // <li key = {props.roomActivity.indexOf(activity)}>
                            <li key = {Math.random()}>
                                {activity}
                            </li>
                        )
                    })}
                </ul>
        </div>
    )
}

export default RoomActivity;