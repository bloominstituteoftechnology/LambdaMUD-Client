import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';




class Main extends Component {
  state = { 
    title: '',
    description: '',
    input: '',
    messages: ['test message'],
    players: [],
    playerName: '',
   }

  handleInput = (e) => {
    this.setState({ input: e.target.value });
  }

  handleMove = (e) => {
    e.preventDefault();
    const moveDirection = { direction: this.state.input };
    console.log(e.target.value)
    axios.post(
      'https://mudmud.herokuapp.com/api/adv/move',
      moveDirection, {//{"direction":"s"}, {
        headers: 
         //{ Authorization: `Token ${localStorage.getItem('lambdaMudKey')}` }
         { Authorization: `Token 1e85198a887bf656c4da17ea8bc9e4e3d4eea4c7` }
       }
    )
      .then(response => {
        console.log(response)
        this.setState({ 
          title: response.data.title,
          description: response.data.description,
          input: '',
          players: response.data.players,
        });
      })
      .catch(err => {
        console.log(err)
      }); 
  }

  componentDidMount() {
    const pusher = new Pusher('dac79d52d64228f70d36', {
      cluster: 'us2',
      encrypted: true,
    })
    axios.get(
      'https://mudmud.herokuapp.com/api/adv/init', {
       headers: 
       { Authorization: `Token 1e85198a887bf656c4da17ea8bc9e4e3d4eea4c7` }
        //{ Authorization: `Token ${localStorage.getItem('lambdaMudKey')}` }
      }
    )
      .then(response => {
        console.log(response);
        const channel = pusher.subscribe(`p-channel-${response.data.uuid}`);
        channel.bind('broadcast', data => {
          console.log(data)
          this.setState({ messages: [...this.state.messages, data.message] })
        })
        this.setState({ 
          title: response.data.title, 
          description: response.data.description, 
          players: response.data.players,
          playerName: response.data.name,
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() { 
    return ( 
      <div className="App">
        <h3>{this.state.title}</h3>
        <h5>{this.state.description}</h5>
        {
          this.state.messages.map((message) => {
            return <h5 key={Math.random()}>{message}</h5>
          })
        }
        <form>
          <input onChange={this.handleInput} type="text" value={this.state.input}placeholder="enter direction"/>
          <button onClick={this.handleMove}>Move</button>
        </form>
      </div> 
    );
  }
}
 
export default Main;




