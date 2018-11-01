import React from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

export default class GameView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      player: {},
      message: "",
      player_msg: ""
    }
  }

  componentDidMount() {
    const headersAuth = {
      headers: {
        Authorization: `Token ${localStorage.getItem('key')}`
      }
    }
      axios.get('https://lambdam-u-d.herokuapp.com/api/adv/init', headersAuth).then(res => {
        const pusher = new Pusher('b5aff16f4c42d34235a8', {
          cluster: 'us2'
        });
        this.setState({player: res.data})
        const channel = pusher.subscribe(`p-channel-${res.data.uuid}`);
        channel.bind('broadcast', response => {
          const systemMsg = Object.values(response).toString();
          this.setState({player_msg: systemMsg})
        });
      }).catch(err => console.log(err))
  }

  changer = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  doTheThing = (event) => {
    const msgArr = this.state.message.split(" ");
    const headersAuth = {
      headers: {
        Authorization: `Token ${localStorage.getItem('key')}`
      }
    }
    console.log('msgArr:', msgArr)
    if (msgArr[0].toLowerCase() === 'go') {
      if (msgArr[1].toLowerCase() === 'n'||msgArr[1].toLowerCase() === 's'||msgArr[1].toLowerCase() === 'e'||msgArr[1].toLowerCase() === 'w'||msgArr[1].toLowerCase() === 'north'||msgArr[1].toLowerCase() === 'south'||msgArr[1].toLowerCase() === 'east'||msgArr[1].toLowerCase() === 'west') {
        const direction = {
          direction: msgArr[1][0].toLowerCase()
        };
        console.log('fire', direction);
        axios.post('https://lambdam-u-d.herokuapp.com/api/adv/move', direction, headersAuth).then(res => {
          this.setState({
            player: res.data,
            message: "",
            player_msg: res.data.error_msg
          });
        }).catch(err => console.log(err))
      } else {
        const msg = this.state.message;
        this.setState({player_msg: `Unknown command: ${msg}`, message: ""});
      }
    } else if (msgArr[0].toLowerCase() === 'say') {
      msgArr.shift();
      const myMessage = {
        message: msgArr.join(" ")
      }
      axios.post('https://lambdam-u-d.herokuapp.com/api/adv/say', myMessage, headersAuth).then(res => {
        console.log(res)
        this.setState({
          message: "",
          player_msg: res.data.status + ` say \"${myMessage.message}\"`
        })
      }).catch(err => console.log(err))
    } else {
      const msg = this.state.message;
      this.setState({player_msg: `Unknown command: ${msg}`, message: ""});
    }
  }

  render() {
    return (
      <div>
        <h2>Current Room: {this.state.player.title}</h2>
        <h3>What you see: {this.state.player.description}</h3>
        <h4>Who you see: {this.state.player.players}</h4>
        <label>Action: ('say' or 'go')</label>
        <h4>{this.state.player_msg}</h4>
        <input onChange={this.changer} type="text" name="message" placeholder="Action..." value={this.state.message}/>
        <button type='button' onClick={this.doTheThing}>Do it!</button>
      </div>
    )
  }
}
