import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Pusher from 'pusher-js'
import { setPusherClient } from 'react-pusher'

import './Adventure.css'
import Display from './Display/Display';

const socket = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  forceTLS: true
})

setPusherClient(socket)

class Adventure extends Component {
  state = {
    user: null,
    broadcast: []
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
        const channel = socket.subscribe(`p-channel-${user.uuid}`)
        channel.bind('broadcast', data => {
          console.log(data)
          this.setState({ broadcast: [...this.state.broadcast, data] })
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentWillUnmount() {
    socket.disconnect()
  }

  render() {
    return (
      <div className='adventure-wrapper'>
      {this.state.user ? (
        <Fragment>
          <button onClick={this.logout}>Logout</button>
          <Display user={this.state.user} broadcast={this.state.broadcast} />
        </Fragment>
      ) : (
        <Fragment />
      )}
      </div>
    )
  }
}

export default Adventure