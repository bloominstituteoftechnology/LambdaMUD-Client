import React from 'react';
import styled from 'styled-components';
import MessageLog from './MessageLog';
import Command from './Command';

const GameControl = styled.div`
    width: 70%;
`

class Play extends React.Component {
    render() {
        return (
            <GameControl className="game-control">
                <MessageLog messages={this.props.messages} />
                <Command
                    command={this.props.command}
                    changeHandler={this.props.changeHandler}
                    submitHandler={this.props.submitHandler}
                />
            </GameControl>
        );
    }
}

export default Play;