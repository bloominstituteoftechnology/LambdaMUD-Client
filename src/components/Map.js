import React, { Component } from "react";
import foyer from './fffff-foyer.png';
import outside from './fffff-outside.png';
import overlook from './fffff-overlook.png';
import treasure from './fffff-treasure.png';
import narrow from './fffff-narrow-passage.png';
class Map extends  Component {
    state = {
        roomPics : {"Outside Cave Entrance": outside, "Foyer": foyer, "Grand Overlook": overlook, "Narrow Passage": narrow, "Treasure Chamber": treasure}
    }


    render() {
        //pass some props down the room name. 
        console.log(this.props.title)
        return (
            <div>
                <img className = "map-img" src= {this.state.roomPics[this.props.title]} alt="Game map and position of the user."/>
            </div>
        )
    }
}

export default Map;