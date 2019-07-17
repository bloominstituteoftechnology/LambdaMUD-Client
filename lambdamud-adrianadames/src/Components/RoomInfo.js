import React from 'react';
import styled from 'styled-components';

const RoomInfo = props => {
    return (
        <RoomInfoContainerStyledDiv>
            <RoomTitleAndDescriptionStyledDiv>
                <div>
                    Current Room: {props.roomTitle}
                </div>
                <div>
                    Description: {props.roomDescription}
                </div>
            </RoomTitleAndDescriptionStyledDiv>


            <PlayersInRoomContainerStyledDiv>
                {console.log('players in room:', props.namesOfPlayersInRoom)}
                Players in Room: 
                {props.namesOfPlayersInRoom.map(player => {
                    return (
                        <div key = {Math.random()}>
                            {player}
                        </div>
                    )
                })}
            </PlayersInRoomContainerStyledDiv>
        </RoomInfoContainerStyledDiv>
    )
}

const RoomTitleAndDescriptionStyledDiv = styled.div`
    display:flex;
    flex-direction:column;
    width:80%;
    border:1px solid green;
    margin:5px;
`
const PlayersInRoomContainerStyledDiv = styled.div`
    width:20%
    border:1px solid green;
    margin 5px;
    height:80px;
    overflow:auto;

`
const RoomInfoContainerStyledDiv = styled.div`
    display:flex;
`

export default RoomInfo;
