import React from 'react';
import '../styles/Console.css';
import Entry from './Entry';

const Console = (props) => {
    return (
        <div className='Console'>
            {props.rooms.map(room => {
                return (
                    <Entry room={room} key={Math.random()} />
                )
            })}
        </div>
    );
}
 
export default Console;
