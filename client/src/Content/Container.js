import React from 'react';
import styled from 'styled-components';
import Play from './Play';
import Status from './Status'

const Content = styled.div`
    display: flex;
    justify-content: space-around;
    font-family: 'Noto Serif KR', sans-serif;
    font-size: 15px;
`

class Container extends React.Component {
    render() { 
        return ( 
            <Content className="container">
                <Play 
                    messages={this.props.messages}
                    command={this.props.command}
                    changeHandler={this.props.changeHandler}
                    submitHandler={this.props.submitHandler}
                />
                <Status 
                user={this.props.user} 
                room={this.props.room}
                playerList={this.props.playerList}
                />
            </Content>
         );
    }
}
 
export default Container;