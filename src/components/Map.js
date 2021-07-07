//The purpose of this file is to provide a map so the player an see it.  
//I put it on a page by itself because I couldn't work out the spacing right before the deadline but 
//I would like to maybe   upon cliking a button bring it in across the game page and then out or perhaps 
//fit it all together
import React, { Component } from "react";
import { Link } from "react-router-dom";
import foyer from "./fffff-foyer.png";
import outside from "./fffff-outside.png";
import overlook from "./fffff-overlook.png";
import treasure from "./fffff-treasure.png";
import narrow from "./fffff-narrow-passage.png";
class Map extends Component {
  state = {
    roomPics: {
      "Outside Cave Entrance": outside,
      Foyer: foyer,
      "Grand Overlook": overlook,
      "Narrow Passage": narrow,
      "Treasure Chamber": treasure
    }
  };

  render() {
    //pass some props down the room name.
    const token = localStorage.getItem("jwt");
    return (
      <div>
        <h1 className="animation-title">LambdaMUD</h1>
        <img
          className="map-img"
          src={this.state.roomPics[this.props.location.state.title]}
          alt="Game map and position of the user."
        />
        <Link to ={{pathname: "/game", state : {token}}}>
          <button className="web-btn">
            <span className="char2 title-first">B</span>
            <span className="char3 title-second">a</span>
            <span className="char4 title-third">c</span>
            <span className="char5 title-first">k</span>
            <span className="char1 title-second"> T</span>
            <span className="char2 title-third">o</span>
            <span className="char2 title-first"> G</span>
            <span className="char2 title-first">a</span>
            <span className="char3 title-second">m</span>
            <span className="char4 title-third">e</span>
          </button>
        </Link>
      </div>
    );
  }
}

export default Map;
