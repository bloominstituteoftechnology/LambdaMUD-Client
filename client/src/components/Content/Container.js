import React from 'react';
import styled from 'styled-components';
import GamePlay from './GamePlay';
import GameInfos from './GameInfos'

const Content = styled.div`
    display: flex;
    justify-content: space-around;
`

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Content className="container">
                <GamePlay />
                <GameInfos user={this.props.user} room={this.props.room}/>
            </Content>
         );
    }
}
 
export default Container;