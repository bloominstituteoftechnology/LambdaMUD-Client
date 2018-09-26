import React from 'react';
import '../styles/Console.css';
import Entry from './Entry';

const Console = () => {
    return (
        <div className='Console'>
            <h1 className='res-title'>Past Response:</h1>
            <Entry/>
            <h1 className='res-title res2'>Response:</h1>
            <Entry/>
            {/* {this.props.rooms.map(room => {
                return (
                    <Entry room={room}/>
                )
            })} */}
        </div>
    );
}
 
export default Console;