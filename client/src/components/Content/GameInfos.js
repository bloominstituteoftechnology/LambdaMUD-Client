import React from 'react';
import styled from 'styled-components';
import CharacterInfos from './CharacterInfo';
import RoomDescription from './RoomDescription';

const GameInfomation = styled.div`
    width: 20%;
`

class GameInfos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <GameInfomation className="game-information">
                <CharacterInfos user={this.props.user} />
                <RoomDescription room={this.props.room} />
            </GameInfomation>
        );
    }
}

export default GameInfos;