import React, { Component } from 'react';
import '../styles/Console.css';
import Entry from './Entry';

class Console extends Component {
    componentDidUpdate() {
        const element = document.getElementById('console')
        element.scrollTop = element.scrollHeight
    }
    render() { 
        return (
            <div className='Console' id='console'>
                {this.props.rooms.map(room => {
                    return (
                        <Entry room={room} key={Math.random()} />
                    )
                })}
            </div>
        );
    }
}
 
export default Console;
