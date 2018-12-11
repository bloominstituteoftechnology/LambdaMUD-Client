import React from 'react'
import axios from 'axios'

class Mud extends React.Component {
  state = {
    input: {
      direction: ''
    }
  }
  
  initGame = () => {
    // game code here
    axios.get('https://one-hit-hunter.herokuapp.com/api/adv/init/', {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    })
      .then(response => {
        console.log(response)
        document.getElementById('game-area').value += `\n========================================\n${response.data.title} \n${response.data.description} \n========================================\n`
        response.data.players.map(player => {
          console.log(player)
          if (response.data.players.map.length === 0) {
            document.getElementById('game-area').value += `No one is standing in this room besides you\n`
          }
          document.getElementById('game-area').value += `${player} is standing here\n`
        })
      })
      .catch(err => console.log(err))    

  } // --> initGame

  makeMove = () => {
    axios.post('https://one-hit-hunter.herokuapp.com/api/adv/move/', this.state.input, { headers: { Authorization: `Token ${localStorage.getItem('token')}` } })
      .then(response => {
        console.log(response)
        document.getElementById('game-area').value += `\n========================================\n${response.data.title} \n${response.data.description} \n========================================\n`
        response.data.players.map(player => {
          console.log(player)
          if (response.data.players.map.length === 1) {
            document.getElementById('game-area').value += `No one is standing in this room besides you\n`
          }
          document.getElementById('game-area').value += `${player} is standing here\n`
        })
      })
      .catch(err => console.log(err))
  }

  handleChange = (e) => {
    e.preventDefault()

    const { name, value } = e.target
    console.log([name],': ', value)
    this.setState({
      input : {
        ...this.state.input,
        [name]: value
      }       
    })
  }

  handleSubmit = () => {
    this.makeMove()
  }

  componentDidMount() {
    this.initGame();
  }

  render() {
    return (
      <div className='game-window'>
        <div className = 'text-area'>
          <textarea rows = '30' cols = '100' id='game-area' readOnly={true}>
            Welcome to One Hit Hunter            
          </textarea>
        </div>
        <input
          placeholder = 'User input'
          name = 'direction'
          type = 'text'
          value = {this.state.input.direction}
          onChange = {this.handleChange}
        />
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    )
  }
}

export default Mud