import React from 'react';
import styled from 'styled-components';
import Characters from './Characters';
import Rooms from './Rooms';

const GameInfo = styled.div`
    width: 20%;
`

class Status extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <GameInfo className="game-information">
                <Characters user={this.props.user} />
                <Rooms room={this.props.room} playerList={this.props.playerList}/>
            </GameInfo>
        );
    }
}

export default Status;