import React, { Component } from 'react';
import './components.css';


class ChatBox extends Component {
    constructor(props) {
        super(props)
    }

componentDidMount(gameprogress) {
let test = JSON.stringify(gameprogress)
console.log('testgameprogress', test)
}
    render() {
       
        return (
            <div className='display-chat-room'>
               
               <p className='display-player-text'>This is where Chat messages live.</p>
            </div>
        );
    }
}

export default ChatBox;