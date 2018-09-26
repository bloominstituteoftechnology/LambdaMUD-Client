import React from 'react';
import Styled from 'styled-components';


const KeyContainer = Styled.ul`
    display: flex;
    flex-direction: column;
    width: 90px;
    height: 150px;
    justify-content: space-between;
    align-items: center;
    border: 1px solid gray;
`;

const ListItem = Styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
    border-bottom: 1px solid gray;
    width: 100%;
    height: 20px;
`;

const Key = props => {
    return (
        <div>
            <KeyContainer>
                <ListItem>move n</ListItem>
                <ListItem>move s</ListItem>
                <ListItem>move e</ListItem>
                <ListItem>move w</ListItem>
                <ListItem>say ...</ListItem>
            </KeyContainer>
        </div>
    )
}

export default Key;