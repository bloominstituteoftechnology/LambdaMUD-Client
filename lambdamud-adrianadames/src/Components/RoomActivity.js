import React from 'react';
import styled from 'styled-components';

// if someone enters or leaves the room, update room activity
// if someone says something, update the room activity
// if player leaves to different room, clear old room activity (?)

const RoomActivity = props => {
    console.log('props: ', props)
    return (
        <RoomActivityContainerStyledDiv>
            Room Activity: 
                <ul>
                    {props.roomActivity.map((activity, index) => {
                        if (activity.match(/says/)) {
                            return(
                                // NOTE: Change how key's generated because if a player does two of the same activity, 
                                // two items on the list will end up having the same key. 
                                // <li key = {props.roomActivity.indexOf(activity)}>
                                <li key = {index}>
                                    {activity}
                                </li>
                            )
                        } else if (activity.match(/has walked/) || activity.match(/has entered/)) {
                                return (
                                    <li key = {index}>
                                        {activity}
                                    </li> 
                                )
                            }
                        else {
                            return (
                                <li key = {index}>
                                    you said: {activity}
                                </li> 
                            )
                        }
                        
                    })}
                </ul>
        </RoomActivityContainerStyledDiv>
    )
}

const RoomActivityContainerStyledDiv = styled.div`
  display:flex;
  flex-direction:column;
  border: 1px solid green;
  height:150px;
  margin:5px;
`



export default RoomActivity;