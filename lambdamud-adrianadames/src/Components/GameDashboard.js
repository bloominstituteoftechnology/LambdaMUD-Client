import React from 'react';
import RoomInformation from './RoomInformation';
import RoomActivity from './RoomActivity';
import CommandInput from './CommandInput';
import styled from 'styled-components';

// Main Functionality: Create a game view for a logged in user
//      -Make an init request upon loading game view to receive the player's 
//       starting location and unique id
//      -Subscribe to the pusher channel named p-channel-<uuid> and bind to 
//       broadcast events (Handle incoming broadcast messages by displaying 
//       them to the player)
//      -Parse user commands, then make API calls based on valid inputs 
//       (Handle valid API responses and update the display accordingly)

// So, how do I go about initializing the game here? After the user logs in, 
// I want the login component to dissappear and the dashboard component to 
// appear. 


const GameDashboard = props => {
    return(
        <div>
            <RoomInformationContainerStyledDiv>
              <RoomInformation 
                playerCurrentRoomTitle = {props.playerCurrentRoomTitle}
                playerCurrentRoomDescription = {props.playerCurrentRoomDescription}
                playerCurrentRoomPlayerNames = {props.playerCurrentRoomPlayerNames}
              />
            </RoomInformationContainerStyledDiv>

            <RoomActivityContainerStyledDiv>
              <RoomActivity 
                playerCurrentRoomActivity = {props.playerCurrentRoomActivity}
              />
            </RoomActivityContainerStyledDiv>
            
            <CommandInputContainerStyledDiv>
              <CommandInput 
                moveSubmitHandler = {props.moveSubmitHandler}
                saySubmitHandler = {props.saySubmitHandler}
                sayText = {props.sayText}
                inputChangeHandler = {props.inputChangeHandler}
              />
            </CommandInputContainerStyledDiv>

        </div>
    )
}

const AppContainerStyledDiv = styled.div`
  display:flex;
  width: 900px;
  border: 1px solid black;
  margin-left:10px;
  margin-right:10px;
`
const RoomInformationContainerStyledDiv = styled.div`
  display:flex;
`
const RoomActivityContainerStyledDiv = styled.div`
  display:flex;
`
const CommandInputContainerStyledDiv = styled.div`
  display:flex;
`

export default GameDashboard;