import React from 'react';

const RoomActivity = props => {
    return (
        <div>
            Room Activity: 
                <ul>
                    {props.roomActivity.map(activity => {
                        return(
                            <li key = {props.roomActivity.indexOf(activity)}>
                                activity
                            </li>
                        )
                    })}
                </ul>
        </div>
    )
}

export default RoomActivity;