import React from 'react';
import { MainError, MainPlayer } from './StyledComponents/Main';

const MainUserInfo = props => {
    return (
        <div>
            {props.user.error_msg ? <MainError>{props.user.error_msg}</MainError> :
                <React.Fragment>
                    <p>{props.user.title}</p>
                    <p>{props.user.description}</p>
                    {props.user.players.map(player => <MainPlayer key={Math.random()}>{player} is standing here</MainPlayer>)}
                    {props.user.broadcast.map(broadcast => <MainPlayer orange key={Math.random()}>{broadcast}</MainPlayer>)}
                </React.Fragment>}
        </div>
    );
}

export default MainUserInfo;