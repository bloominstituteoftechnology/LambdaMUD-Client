import React from 'react';
import styled from 'styled-components';


const InfoDiv = styled.div`
    border: 1px solid #457B9D;
    border-radius: 5px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(45,45,45,0.23);
    background: rgba(240, 240, 240, .7);
    margin: 20px 0;
    min-height: 25em;
`

const MsgDiv = styled.div`
    border: 1px solid #457B9D;
    border-radius: 5px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(45,45,45,0.23);
    background: rgba(240, 240, 240, .7);
    margin: 20px 0;
    min-height: 48em;
`

const CommandDiv = styled.div`
    border: 1px solid #457B9D;
    border-radius: 5px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(45,45,45,0.23);
    background: rgba(240, 240, 240, .7);
    margin: 20px 0;
    min-height: 2em;
`

const GameControl = styled.div`
    width: 70%;
`

const GameInfomation = styled.div`
    width: 20%;
`

const Content = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 5% 0;
`

const Input = styled.input`
    height: 2em;
    background: None;
    padding: 0;
    border:0;
    outline: none;
    width: 100%;
    padding: 0 5px;
    &::placeholder {
        color: rgba(50,50,50,0.6);
    }
`

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Content className="container">
                <GameControl className="game-control">
                    <MsgDiv className="game-messageLog">
                        Message Log Here
                    </MsgDiv>
                    <CommandDiv>
                        <Input type="text" className="console-command" placeholder="Enter Command"/>
                    </CommandDiv>
                </GameControl>
                <GameInfomation className="game-information">
                    <InfoDiv className="character">
                        Character Details
                    </InfoDiv>
                    <InfoDiv className="room-description">
                        Room Description
                    </InfoDiv>
                </GameInfomation>
            </Content>
         );
    }
}
 
export default Container;