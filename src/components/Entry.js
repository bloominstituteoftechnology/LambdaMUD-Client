import React from 'react';
import '../styles/Entry.css';

const Entry = (props) => {
    if (typeof(props.room.message) === 'string') {
        return (
            <div className='Entry'>
                <p className='line'>{props.room.message}</p>
                <hr/>
            </div>
        )
    }
    else if (typeof(props.room) === 'string') {
        return (
            <div className='Entry'>
                <p className='line'>{props.room}</p>
                <hr/>
            </div>
        )
    }
    else if (typeof(props.room) === 'object') {
        return (
            <div className='Entry'>
                <p className='line'>{props.room.title}</p>
                <p className='line'>{props.room.description}</p>
                {props.room.players.map(player => <p className='line' style={{ color: 'green' }} key={Math.random()}>{player} is standing here{"\n"}</p>)}
                <hr/>
            </div>
        )
    }
}
 
export default Entry;