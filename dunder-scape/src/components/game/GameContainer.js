import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const GameWrapper = styled.div`

`;
const PlayerInfoWrapper = styled.div`
`;

const PlayerInfo = styled.h2`
    font-size: 2.4rem;
`;
class GameContainer extends Component {
    constructor(props) {
    super(props);
    this.state = { 
        gameLoaded: false,
        playerName: 'Unknown',
        currentRoom: 'Unknown',
        roomDescription: 'Unknown',
        allPlayers: []
     }
    }


    componentDidMount() {
        axios.get('http://dunder-scape.herokuapp.com/api/adv/init/', {
            headers: {
                "Authorization": `Token ${localStorage.getItem('mudToken')}`
            }
        })
        .then(({ data }) => {
            console.log(data)
            this.setState({
                gameLoaded: true,
                playerName: data.name,
                currentRoom: data.title,
                roomDescription: data.description,
                allPlayers: data.players
            })
        })
        .catch(err => {
            console.log('error initializing game', err);
        })
    }

    render() { 
        const { gameLoaded, playerName, currentRoom, roomDescription, allPlayers } = this.state;
        if (gameLoaded === false) {
            return (
                <p>Please wait while game is loading.</p>
            )
        }
        else {
            return (
                <GameWrapper>
                    <PlayerInfoWrapper>
                        <PlayerInfo>Name: {playerName}</PlayerInfo>
                        <PlayerInfo>Current Location: {currentRoom}</PlayerInfo>
                        <PlayerInfo>Location Description: {roomDescription}</PlayerInfo>
                    </PlayerInfoWrapper>
                </GameWrapper>
            )
        }
    }
}
 
export default GameContainer;