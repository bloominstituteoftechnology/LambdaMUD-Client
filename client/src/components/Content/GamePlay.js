import React from 'react';
import styled from 'styled-components';
import MessageLog from './MessageLog';
import InputCommand from './InputCommand';

const GameControl = styled.div`
    width: 70%;
`

class GamePlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidmount() {
        const message =[`Welcome to Lambda Adventure, ${this.props.user.username}!`]
        console.log(message)
        this.setState({ data: message });
    }

    render() {
        return (
            <GameControl className="game-control">
                <MessageLog data={this.state.data}/>
                <InputCommand />
            </GameControl>
        );
    }
}

export default GamePlay;