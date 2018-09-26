import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Pusher from 'pusher-js'

import Display from './Display/Display'
import Command from './Command/Command'

import './Adventure.css'

const socket = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  forceTLS: true
})


class Adventure extends Component {
  state = {
    user: null,
    broadcast: []
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

  handleCommand = (event, command) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    let commandStr = command.split(' ')
    command = commandStr.shift()
    console.log(command)
    switch (command) {
      case 'say':
      commandStr = commandStr.join(' ')
      const message = {
        message: commandStr
      }
      console.log(message)
      axios
        .post(process.env.REACT_APP_SAY_URL, message, {headers: { Authorization: token }})
        .then(res => {
          console.log(res)
          const message = {
            message: `${res.data.name}: ${res.data.message}`
          }
          this.setState({ broadcast: [...this.state.broadcast, message]})
        })
        .catch(err => console.log(err.response))
        break
      default:
        console.log(command)
        const move = {
          direction: command
        }
        axios
          .post(process.env.REACT_APP_MOVE_URL, move, {headers: { Authorization: token }})
          .then(res => {
            const user = res.data
            this.setState({ user })
          })
          .catch(err => console.log(err.response))
        break
    }
  }

  logout() {
    localStorage.removeItem('token')
    window.location.pathname = '/'
  }

  render() {
    return (
      <div className='adventure-wrapper'>
      {this.state.user ? (
        <Fragment>
          <button onClick={this.logout}>Logout</button>
          <Display user={this.state.user} broadcast={this.state.broadcast} />
          <Command handleCommand={this.handleCommand} />
        </Fragment>
      ) : (
        <Fragment />
      )}
      </div>
    )
  }
}

export default Adventure