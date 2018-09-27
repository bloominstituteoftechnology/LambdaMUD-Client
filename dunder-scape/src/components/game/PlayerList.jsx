import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
    background: var(--light-black);
`;

const PlayerList = (props) => {
    return (<ul>
        {props.players.map((player) => {
            return <li key = {player}>{player}</li>
        })}
    </ul>)
}
 
export default PlayerList;