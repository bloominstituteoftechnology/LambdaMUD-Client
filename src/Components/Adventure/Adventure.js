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
    broadcast: [],
    color: ''
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    axios
      .get(process.env.REACT_APP_INIT_URL, {headers: { Authorization: token }})
      .then(res => {
        const user = { ...res.data }
        this.setState({ user, color: this.decideColor() })
        const channel = socket.subscribe(`p-channel-${user.uuid}`)
        channel.bind('broadcast', data => {
          axios
          .get(process.env.REACT_APP_INIT_URL, {headers: { Authorization: token }})
          .then(res => {
            const user = { ...res.data}
            this.setState({ user, broadcast: [...this.state.broadcast, data] })
            const messageDiv = document.querySelector('.messages')
            this.scrollToBottom(messageDiv)
          })
          .catch(err => console.log(err))
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentWillUnmount() {
    socket.disconnect()
  }

  scrollToBottom = el => {
    el.scrollTop = el.scrollHeight
  }

  handleCommand = (event, command) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    const allowed = ['n', 's', 'e', 'w', 'say']
    let commandStr = command.split(' ')
    command = commandStr.shift().toLowerCase()
    const includes = allowed.includes(command)
    if (includes) {
      switch (command) {
        case 'say':
        commandStr = commandStr.join(' ')
        const message = {
          message: commandStr
        }
        axios
          .post(process.env.REACT_APP_SAY_URL, message, {headers: { Authorization: token }})
          .then(res => {
            const message = {
              message: `${res.data.name}: ${res.data.message}`
            }
            this.setState({ broadcast: [...this.state.broadcast, message]})
            const messageDiv = document.querySelector('.messages')
            this.scrollToBottom(messageDiv)
          })
          .catch(err => console.log(err))
          break
        default:
          const move = {
            direction: command
          }
          axios
            .post(process.env.REACT_APP_MOVE_URL, move, {headers: { Authorization: token }})
            .then(res => {
              const user = res.data
              const message = {
                message: `< moved to ${user.title} >`
              }
              this.setState({ user, broadcast: [...this.state.broadcast, message] })
              const messageDiv = document.querySelector('.messages')
              this.scrollToBottom(messageDiv)
            })
            .catch(err => console.log(err.response))
          break
      }
    } else {
      return
    }
  }

  decideColor() {
    const colors = ['black', 'green', 'blue', 'purple', 'red', 'orange']
    const randInt = Math.floor(Math.random() * 6)
    console.log(randInt)
    return colors[randInt]
  }

  logout() {
    localStorage.removeItem('token')
    window.location.pathname = '/'
  }

  render() {
    return (
      <div className='adventure'>
      {this.state.user ? (
        <Fragment>
          <div className='header'>
            <p>// lambdaMUD</p>
            <p onClick={this.logout}>logout</p>
          </div>
          <div className={`adventure-wrapper ${this.state.color}`}>
            <Display user={this.state.user} broadcast={this.state.broadcast} color={this.state.color} />
            <Command handleCommand={this.handleCommand} />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>...loading...</p>
        </Fragment>
      )}
      </div>
    )
  }
}

export default Adventure