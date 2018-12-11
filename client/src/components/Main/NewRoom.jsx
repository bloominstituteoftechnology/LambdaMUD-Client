import React from 'react';
import Styled from 'styled-components';

const Wrapper = Styled.div`
    
`;

function NewRoom(props) {
    // let str = '';
    // if (props.players.length > 0) {
    //     str = `There are ${props.players.length} people in this room.`
    // }

    return (
        <Wrapper>
            <h4>{props.room.title}</h4>
            <p>{props.room.description}</p>
            <br></br>
        </Wrapper>
    )
};

export default NewRoom;