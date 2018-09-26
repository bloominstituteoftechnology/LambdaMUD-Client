import React, { Component, Fragment } from 'react'
import axios from 'axios'

import './Adventure.css'
import Display from './Display/Display';

class Adventure extends Component {
  state = {
    user: null
  }

  logout() {
    localStorage.removeItem('token')
    window.location.pathname = '/'
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    axios
      .get(process.env.REACT_APP_INIT_URL, {headers: { Authorization: token }})
      .then(res => {
        const user = { ...res.data }
        const playerList = []
        user.players.forEach(player => {
          const playerObj = {}
          playerObj.name = player
          playerList.push(playerObj)
        })
        user.players = playerList
        this.setState({ user })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.logout}>Logout</button>
        <Display user={this.state.user} />
      </Fragment>
    )
  }
}

export default Adventure