import React, { Component } from 'react'
import axios from 'axios'

import RoomDetail from './Room_detail'

export default class Room extends Component {
    state = {
        room: []
    }

    componentDidMount(){
        axios
            .get('https://lambda-mud-test.herokuapp.com/') //waiting for endpoint
            .then(res => {
                this.setState({
                    room: res.data
                })
            })
    }

    render() {
        return (
            <div>
                {this.state.room.map(room => 
                    <RoomDetail room={room} key={room.title}/>
                )}
            </div>
        )
    }
}
