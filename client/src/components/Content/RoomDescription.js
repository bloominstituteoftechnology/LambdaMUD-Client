import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    border: 1px solid #457B9D;
    border-radius: 5px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(45,45,45,0.23);
    background: rgba(240, 240, 240, .7);
    margin: 20px 0;
    min-height: 25em;
    text-align: left
`

const Title = styled.span`
    text-align: left;
    margin-left: 5%;
`

const Span = styled.span`
    text-align: center;
    display: block;
`

const RoomDescription = (props) => {
    const playerList = props.playerList.map((player, index) => <Span key={String(index)}>{player}</Span>)

    return (
        <Div className="character">
            <Span style={{color:'#457B9D', margin: '10px 0'}}>Room Description</Span>
            <Title>Name:</Title> 
            <Span>{props.room.title}</Span>
            <br/>
            <Title>Players List:</Title>
            {playerList}
        </Div>
    );
}

export default RoomDescription;