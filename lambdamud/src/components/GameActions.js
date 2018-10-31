import React from 'react';

const GameAction=(props)=><div>
    <p>{props.data.title}</p>
    <p>{props.data.description}</p>
    <p>{`Players surrounding you include: ${props.data.players.join(', ')}`}</p>
</div>
export default GameAction;