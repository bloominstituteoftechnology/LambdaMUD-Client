import React from 'react';
import styled from 'styled-components';
import GamePlay from './GamePlay';
import GameInfos from './GameInfos'

const Content = styled.div`
    display: flex;
    justify-content: space-around;
`

class Container extends React.Component {
    render() { 
        return ( 
            <Content className="container">
                <GamePlay 
                    messages={this.props.messages}
                    command={this.props.command}
                    changeHandler={this.props.changeHandler}
                    submitHandler={this.props.submitHandler}
                />
                <GameInfos 
                user={this.props.user} 
                room={this.props.room}
                playerList={this.props.playerList}
                />
            </Content>
         );
    }
}
 
export default Container;