import React from 'react';
import { MainError, MainPlayer, MainDirections } from './StyledComponents/Main';
import reactStringReplace from 'react-string-replace';

const MainUserInfo = props => {
    let replacedText = reactStringReplace(props.user.description, 'north', (match, i) => (
        <MainDirections onClick={() => props.move('n')} key={match + i}>{match}</MainDirections>
    ));

    replacedText = reactStringReplace(replacedText, 'south', (match, i) => (
        <MainDirections onClick={() => props.move('s')} key={match + i}>{match}</MainDirections>
    ));

    replacedText = reactStringReplace(replacedText, 'east', (match, i) => (
        <MainDirections onClick={() => props.move('e')} key={match + i}>{match}</MainDirections>
    ));

    replacedText = reactStringReplace(replacedText, 'west', (match, i) => (
        <MainDirections onClick={() => props.move('w')} key={match + i}>{match}</MainDirections>
    ));

    if (props.user.message) {
        return (
            <React.Fragment>
                <p className='player-chat'>{props.user.name}: {props.user.message}</p>
                {props.user.broadcast.map(broadcast => <MainPlayer orange key={Math.random()}>{broadcast}</MainPlayer>)}
            </React.Fragment>
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
                <p>{replacedText}
                </p>
                {props.user.players.map(player => <MainPlayer player key={Math.random()}>{player} is standing here</MainPlayer>)}
                {props.user.broadcast.map(broadcast => <MainPlayer orange key={Math.random()}>{broadcast}</MainPlayer>)}
            </div>
        );
    }
}

export default MainUserInfo;