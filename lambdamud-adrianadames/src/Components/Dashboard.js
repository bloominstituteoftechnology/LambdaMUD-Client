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
            <GameTitleStyledDiv>
              LambdaMUD Adventure Game
            </GameTitleStyledDiv>
            <PlayerNameAndLoginStateStyledDiv>
              <PlayerInfo 
                playerName = {props.playerName}
                playerUUID = {props.playerUUID}
              />
              <LogoutStyledButton onClick = {props.logoutSubmitHandler}> logout</LogoutStyledButton>
            </PlayerNameAndLoginStateStyledDiv>
          </DashboardHeaderStyledDiv>



          <RoomAndPlayersInfoStyledDiv>
            <RoomInformation 
                roomTitle = {props.roomTitle}
                roomDescription = {props.roomDescription}
                namesOfPlayersInRoom = {props.namesOfPlayersInRoom}
              />
            
          </RoomAndPlayersInfoStyledDiv>


          <RoomActivityContainerStyledDiv1>
            <RoomActivity 
              roomActivity = {props.roomActivity}
            />
          </RoomActivityContainerStyledDiv1>
          
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
  width:100%;
  border:1px solid green;
  font-family: 'Roboto Mono', monospace;
  color:#49fb35;
  background-color:black;
`

const DashboardHeaderStyledDiv = styled.div`
  display:flex;  
  // border:1px solid red;
`

const GameTitleStyledDiv = styled.div`
  display:flex;
  height:100px;
  width:70%;
  border:1px solid green;
  align-items:center;
  margin: 5px 5px 5px 5px;
`

const PlayerNameAndLoginStateStyledDiv = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-evenly;
  align-items:center;
  width:30%;
  border:1px solid green;
  margin:5px;
`
const LogoutStyledButton = styled.button`
  height:30px;
  width:40%;
  color:#49fb35;
  // background: repeating-linear-gradient(
  //   45deg,
  //   #740042,
  //   #740042 3px,
  //   #560031 3px,
  //   #560031 6px
  // );
  background: black;
  border:1px solid green;
  :hover {
    border:2px solid #49fb35;
  }
`


const RoomAndPlayersInfoStyledDiv = styled.div`
  width:100%;
`
const RoomActivityContainerStyledDiv1 = styled.div`
  width: 100%;
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