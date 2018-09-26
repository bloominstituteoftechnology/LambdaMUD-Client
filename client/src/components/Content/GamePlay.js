import React from 'react';
import styled from 'styled-components';
import MessageLog from './MessageLog';
import InputCommand from './InputCommand';

const GameControl = styled.div`
    width: 70%;
`

class GamePlay extends React.Component {
    render() {
        return (
            <GameControl className="game-control">
                <MessageLog messages={this.props.messages} />
                <InputCommand
                    command={this.props.command}
                    changeHandler={this.props.changeHandler}
                    submitHandler={this.props.submitHandler}
                />
            </GameControl>
        );
    }
}

export default GamePlay;