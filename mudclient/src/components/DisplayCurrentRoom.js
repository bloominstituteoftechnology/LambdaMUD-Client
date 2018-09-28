import React, { Component } from 'react';
import './components.css';


class displayCurrentRoom extends Component {
    constructor(props) {
        super(props)
    }

componentDidMount(gameprogress) {
let test = JSON.stringify(gameprogress)
console.log('testgameprogress', test)
}
    render() {
        let gameprogress;
        // const gameprogress = <p className ='display-player-text'>Current Area: <span className='display-current-room-title'>{this.props.currentRoom.title}. </span><span className='display-current-room-description'>{this.props.currentRoom.description}</span> <br/> Other Players in Room: {this.props.currentRoom.players.length ? this.props.currentRoom.players.length : '-'} </p>
        if (this.props.currentRoom.title !== ''){
        gameprogress = <p className ='display-player-text'><span className='display-current-room-title'>{this.props.currentRoom.title} </span><span className='display-current-room-description'>{this.props.currentRoom.description}</span></p>
        } else {
        let sessionStorageRoomTitle = sessionStorage.getItem('currentRoomTitle')
        let sessionStorageRoomDesc = sessionStorage.getItem('currentRoomDesc')
        gameprogress = <p className ='display-player-text'><span className='display-current-room-title'>{sessionStorageRoomTitle} </span><span className='display-current-room-description'>{sessionStorageRoomDesc}</span></p>
        }
        return (
            <div className='display-current-room'>
               {gameprogress}
               <p></p>
            </div>
        );
    }
}

export default displayCurrentRoom;