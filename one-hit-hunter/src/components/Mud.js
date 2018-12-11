import React from 'react'
import axios from 'axios'
import Pusher from 'pusher-js'



class Mud extends React.Component {
  state = {
    input: '',
    uuid: '',
    data: ''
  }
  
  initGame = () => {
    // game code here
    axios.get('https://one-hit-hunter.herokuapp.com/api/adv/init/', {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    })
      .then(response => {
        console.log(response)
        this.setState({ 
          uuid: response.data.uuid 
        })
        document.getElementById('game-area').value += `\n========================================\n${response.data.title} \n${response.data.description} \n========================================\n`
        response.data.players.map(player => {
          console.log(player)
          if (response.data.players.map.length === 0) {
            document.getElementById('game-area').value += `No one is standing in this room besides you\n`
            return 'done'
          }
          document.getElementById('game-area').value += `${player} is standing here\n`
          return 'done'
        }) // --> response map  
        this.setupPusher()      
      }) // --> .then()
      .catch(err => console.log(err))    

  } // --> initGame

  makeMove = () => {
    if (this.state.input === "n" || this.state.input === "e" || this.state.input === "s" || this.state.input === "w") {
      axios.post('https://one-hit-hunter.herokuapp.com/api/adv/move/', { direction: this.state.input }, { headers: { Authorization: `Token ${localStorage.getItem('token')}` } })
      .then(response => {
        console.log(response)
        document.getElementById('game-area').value += `\n========================================\n${response.data.title} \n${response.data.description} \n========================================\n`
        response.data.players.map(player => {
          console.log(player)
          if (response.data.players.map.length === 1) {
            document.getElementById('game-area').value += `No one is standing in this room besides you\n`
            return 'done'
          }
          document.getElementById('game-area').value += `${player} is standing here\n`
          return 'done'
        })
      })
      .catch(err => console.log(err))
    } else { // --> if statement for direction
        axios.post('https://one-hit-hunter.herokuapp.com/api/adv/say/', { message: this.state.input }, { headers: { Authorization: `Token ${localStorage.getItem('token')}` } })
          .then(response => {
            console.log(response)
          })
          .catch(err => console.log(err))
    }
    
    
  }

  handleChange = (e) => {
    e.preventDefault()

    this.setState({ input: e.target.value })
  }

  handleSubmit = () => {
    this.makeMove()
  }

  setupPusher = () => {
    Pusher.logToConsole = true;
    let pusher = new Pusher('23b80bb892d798e1d3d7', {
      cluster: 'us2',
      forceTLS: true
    });

    const channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
    channel.bind('broadcast', data => {
      alert('hi' + data.message)
      this.setState({ data: data.message })
    })
  }
  

  componentDidMount() {
    this.initGame();
  }

  render() {
    return (
      <div className='game-window'>
        <div className = 'text-area'>
          <textarea rows = '30' cols = '100' id='game-area' readOnly={true}></textarea>
        </div>
        <input
          placeholder = 'User input'
          name = 'direction'
          type = 'text'
          value = {this.state.input}
          onChange = {this.handleChange}
        />
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    )
  }
}

export default Mud