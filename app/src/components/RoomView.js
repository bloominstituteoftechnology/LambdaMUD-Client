import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import '../styles/RoomViewStyles.css';

const URL = 'https://muddy-screams.herokuapp.com/api/adv/move/';

class RoomView extends Component {
  state ={
    move:'',
    title: '',
    description: '',
    players: []
  }

  componentDidMount(){
    console.log("props in RoomView >> ", this.props.data);
    this.setState({
      title: this.props.data.title,
      description: this.props.data.description,
      players: this.props.data.players
    })
    const pusher = new Pusher('APP_KEY', {
      cluster: 'mt1',
      forceTLS: true
    });
    
    const channel = pusher.subscribe('p-channel-'+ this.props.data.uuid);
    channel.bind('broadcast', data => {
      console.log("data back from broadcast >> ", data);
    });

  }

  onFieldChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
      // console.log(this.state.move);}
  }

  sendMove = () => {
    let payload = {
      direction: this.state.move
    }
    axios.post(URL, payload, 
    {
      headers: {Authorization: `Token ${localStorage.getItem("token")}`}
    })
    .then((res)=>{
      console.log('move response >> ',res.data);
      this.setState({
        title: res.data.title,
        description: res.data.description,
        players: res.data.players
      })
    })
    console.log('room input >> ', document.querySelector('.room-input'));
    document.getElementById('input').value='';
  }

  render(){
    return (
      <div className="room-view-container">
        <div className="room-info-container">
        <div className="room-players">
          Players:
            { 
              this.props.data.players.map((el)=>{
                return <div>  {el}  </div>
              })
            }
          </div>
          <div className="room-title">
          <br />
            Room: {this.state.title}<br /><br />
          </div>
          <div className="room-description">
            Description: {this.state.description}<br /><br />
          </div>
        </div>
        <input id="input" className="room-input" placeholder="Enter move command..." onChange={this.onFieldChange} name="move" />
        <button className="roomvu-send-btn" onClick={this.sendMove}>Move!</button>
        <div className="cmd-options">Command options: n, s, e, w</div>
      </div>
    )
  }
}

export default RoomView;