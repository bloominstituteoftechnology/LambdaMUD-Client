import React, { Component } from 'react';
import '../styles/RoomViewStyles.css';

class RoomView extends Component {
  state ={
    data:null,
  }

  componentDidMount(){
    console.log('in roomview: ',this.props.data);
    this.setState({data: this.props.data});
  }

  onFieldChange = (e) => {

  }

  render(){
    return (
      <div className="room-view-container">
        <div className="room-info-container">
          <div className="room-title">
          <br />
            Room: {this.props.data.title}<br /><br />
          </div>
          <div className="room-description">
            Description: {this.props.data.description}<br /><br />
          </div>
          <div className="room-players">
          Players:
            { 
              this.props.data.players.map((el)=>{
                return <div>{el} </div>
              })
            }
          </div>
        </div>
        <input className="room-input" placeholder="Enter move command..." onChange={this.onFieldChange} name="command" />
        <div className="cmd-options">Command options: n, s, e, w</div>
      </div>
    )
  }
}

export default RoomView;