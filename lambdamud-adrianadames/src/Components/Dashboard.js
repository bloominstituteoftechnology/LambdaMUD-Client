import React from 'react';
import RoomInformation from './RoomInfo';
import RoomActivity from './RoomActivity';
import CommandInput from './CommandInput';
import styled from 'styled-components';
import PlayerInfo from './PlayerInfo';

// Main Functionality: Create a game view for a logged in user
//      -Make an init request upon loading game view to receive the player's 
//       starting location and unique id
//      -Subscribe to the pusher channel named p-channel-<uuid> and bind to 
//       broadcast events (Handle incoming broadcast messages by displaying 
//       them to the player)
//      -Parse user commands, then make API calls based on valid inputs 
//       (Handle valid API responses and update the display accordingly)

const Dashboard = props => {
    return(
        <DashboardContainerStyledDiv>
          <DashboardHeaderStyledDiv>
            <div>
              LambdaMUD Project
            </div>
            <LoginLogoutStateStyledDiv>
              <PlayerInfo 
                playerName = {props.playerName}
                playerUUID = {props.playerUUID}
              />
              <button onClick = {props.logoutSubmitHandler}> logout</button>
            </LoginLogoutStateStyledDiv>
            
          </DashboardHeaderStyledDiv>
          <RoomAndPlayersInfoStyledDiv>
            <RoomInformation 
                roomTitle = {props.roomTitle}
                roomDescription = {props.roomDescription}
                namesOfPlayersInRoom = {props.namesOfPlayersInRoom}
              />
            
          </RoomAndPlayersInfoStyledDiv>


          <RoomActivityContainerStyledDiv>
            <RoomActivity 
              roomActivity = {props.roomActivity}
            />
          </RoomActivityContainerStyledDiv>
          
          <CommandInputContainerStyledDiv>
            <CommandInput 
              moveSubmitHandler = {props.moveSubmitHandler}
              saySubmitHandler = {props.saySubmitHandler}
              sayText = {props.sayText}
              inputChangeHandler = {props.inputChangeHandler}
            />
            <CommandDirectionsStyledDiv>
              Command Directions: 
            </CommandDirectionsStyledDiv>
          </CommandInputContainerStyledDiv>
        </DashboardContainerStyledDiv>
    )
}




const DashboardContainerStyledDiv = styled.div`
  display:flex;
  flex-direction:column;
`

const DashboardHeaderStyledDiv = styled.div`
display:flex;  
border:1px solid red;
`
const LoginLogoutStateStyledDiv = styled.div`
  display:flex;
  flex-direction:column;
`



const RoomAndPlayersInfoStyledDiv = styled.div`
  display:flex;
  border: 1px solid blue;
`
const RoomActivityContainerStyledDiv = styled.div`
  display:flex;
  border: 1px solid green;
`

const RoomInformationContainerStyledDiv = styled.div`
  display:flex;
`

const PlayersInRoomStyledDiv = styled.div`
  display:flex;
  flex-direction:column;
`

const CommandInputContainerStyledDiv = styled.div`
  display:flex;
  border:2px solid orange;
`

const CommandDirectionsStyledDiv = styled.div`
  border:1px solid purple;
`


export default Dashboard;