import React, {Component} from "react";
import styled from "styled-components";

const StyledH2 = styled.h2`
font-size: 1rem
`;

class PlayersInRoom extends React.Component {
  constructor (props) {
    super(props);
 
  }
  render(){
    const namesarray =this.props.players;
    const lastName = this.props.players.slice(-1)[0];
    const shortenedNames = namesarray.slice(0, -1);
    const loopedNames = shortenedNames.map(function(name) {
      return `${name}, `;
    })



    let otherUserText = ''
    let alltext;
    if(this.props.occupants === 0 ){
      otherUserText = <h2>You are alone in this room"</h2>
      alltext = otherUserText
    }

    if(this.props.occupants === 1 ){
      otherUserText = <h2>You are alone in the room with {this.props.players}</h2>
      alltext = otherUserText
    }

    if(this.props.occupants === 2 ){
      const namesarray = this.props.players;
      const lastName = this.props.players.slice(-1)[0];
      const shortenedNames = namesarray.slice(0, -1);
      const loopedNames = shortenedNames.map(function(name) {
        return `${name} `;
      })


      otherUserText = <h2>{loopedNames} and {lastName} are here with you</h2>
      alltext = otherUserText
    }

    if(this.props.occupants > 2 ){
      const namesarray = this.props.players;
      const lastName = this.props.players.slice(-1)[0];
      const shortenedNames = namesarray.slice(0, -1);
      const loopedNames = shortenedNames.map(function(name) {
        return `${name}, `;
      })


      otherUserText = <h2>{loopedNames}{lastName} are here with you</h2>
      alltext = otherUserText
    }

  return (
     <div><StyledH2>{alltext} </StyledH2>  </div>
  

    
     
  )}
}
 

export default PlayersInRoom;
