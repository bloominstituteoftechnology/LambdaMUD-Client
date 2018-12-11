import React from 'react'
import axios from 'axios'

class Mud extends React.Component {
  
  initGame = () => {
    // game code here
    axios.get('https://one-hit-hunter.herokuapp.com/api/adv/init/', {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    })
      .then(response => {
        console.log(response)
        document.getElementById('game-area').value += `\n${response.data.title} \n${response.data.description} \n`
        response.data.players.map(player => {
          console.log(player)
          document.getElementById('game-area').value += `${player} is standing here\n`
        })
      })
      .catch(err => console.log(err))    

  } // --> initGame

  componentDidMount() {
    this.initGame();
  }

  render() {
    return (
      <div className='game-window'>
        <div className = 'text-area'>
          <textarea id='game-area' readOnly={true}>
            Welcome to One Hit Hunter
          </textarea>
        </div>
        <input
          placeholder = 'User input'
        />
      </div>
    )
  }
}

export default Mud