import React, { Component, Fragment } from 'react'
import axios from 'axios'

class Adventure extends Component {
  state = {
    uuid: '',
    name: '',
    title: '',
    description: '',
    players: []
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    axios
      .get(process.env.REACT_APP_INIT_URL, {headers: { Authorization: token }})
      .then(res => {
        const uuid = res.data.uuid
        const name = res.data.name
        const title = res.data.title
        const description = res.data.description
        const players = []
        res.data.players.forEach(player => {
          const playerObj = {}
          playerObj.name = player
          players.push(playerObj)
        })
        this.setState({ uuid, name, title, description, players })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className='adv-container'>
        {this.state.uuid ? (
          <div className='display'>
            <div className="display-text">
              <p>{`Player: ${this.state.name}`}</p>
              <p>{`Location: ${this.state.title}`}</p>
              <p>{`Description: ${this.state.description}`}</p>
              <p>Players in room:</p>
              <ul>
                {this.state.players.map(player => {
                  return <li key={Math.random()}>{player.name}</li>
                })}                
              </ul>
            </div>
          </div>
        ) : (
          <p>... loading ...</p>
        )}
      </div>
    )
  }
}

export default Adventure