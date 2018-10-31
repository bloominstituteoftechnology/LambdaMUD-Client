import React from 'react';
import axios from 'axios';

export default class GameView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      player: {},
      message: ""
    }
  }

  componentDidMount() {
    const headersAuth = {
      headers: {
        Authorization: `Token ${localStorage.getItem('key')}`
      }
    }
      axios.get('https://lambdam-u-d.herokuapp.com/api/adv/init', headersAuth).then(res => {
        this.setState({player: res.data})
      }).catch(err => console.log(err))
  }

  changer = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  doTheThing = (event) => {
    const msgArr = this.state.message.split(" ");
    if (msgArr[0].toLowerCase() === 'go') {
      const direction = {
        direction: msgArr[1].toLowerCase()
      }
      axios.post('https://lambdam-u-d.herokuapp.com/api/adv/move', direction).then(res => {
        this.setState({
          player: res.data,
          message: ""
        })
      }).catch(err => console.log(err))
    } else if (msgArr[0].toLowerCase() === 'say') {
      msgArr.shift();
      const myMessage = {
        message: msgArr.join(" ")
      }
      axios.post('https://lambdam-u-d.herokuapp.com/api/adv/say', myMessage).then(res => {
        console.log(res)
        this.setState({
          message: ""
        })
      }).catch(err => console.log(err))
    } else {

    }
  }

  render() {
    return (
      <div>
        <h2>Current Room: {this.state.player.title}</h2>
        <h3>What you see: {this.state.player.description}</h3>
        <h4>Who you see: {this.state.player.players}</h4>
        <label>Action: ('say' or 'go')</label>
        <input onChange={this.changer} type="text" name="message" placeholder="Action..." value={this.state.message}/>
        <button type='button' onClick={this.doTheThing}>Do it!</button>
      </div>
    )
  }
}
