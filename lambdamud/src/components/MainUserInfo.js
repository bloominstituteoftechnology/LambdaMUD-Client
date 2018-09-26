import React from 'react';
import { MainError, MainPlayer } from './StyledComponents/Main';

const MainUserInfo = props => {
    if (props.user.message) {
        return (
            <React.Fragment>
                <MainPlayer orange><span style={{ color: 'black' }}>{props.user.name}:</span> {props.user.message}</MainPlayer>
                {props.user.broadcast.map(broadcast => <MainPlayer orange key={Math.random()}>{broadcast}</MainPlayer>)}
            </React.Fragment >
        );
    } else if (props.user.error_msg) {
        return (
            <React.Fragment>
                <MainError>{props.user.error_msg}</MainError>
                {props.user.broadcast.map(broadcast => <MainPlayer orange key={Math.random()}>{broadcast}</MainPlayer>)}
            </React.Fragment>
        );
    } else {
        return (
            <div className='user-info-container'>
                <p>{props.user.title}</p>
                <p>{props.user.description}</p>
                {props.user.players.map(player => <MainPlayer player key={Math.random()}>{player} is standing here</MainPlayer>)}
                {props.user.broadcast.map(broadcast => <MainPlayer orange key={Math.random()}>{broadcast}</MainPlayer>)}
            </div>
        );
    }
}

export default MainUserInfo;