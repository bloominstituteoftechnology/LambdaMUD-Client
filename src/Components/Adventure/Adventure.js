/********************
 * 
 * Controller component for Display and Command
 * Picks a random color for styling
 * Gets user init information with valid token and passes down props to display
 * Binds user to pusher channell and passes down new pusher messages to display as props
 * 
 ********************/


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

  // gets user init information and places it on state
  // binds user to pusher channell and updates state with new messages
  // updates user information when pusher gets new messages
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

  // ensure pusher channel comm ends when component unmounts
  componentWillUnmount() {
    socket.disconnect()
  }

  // keeps div overflow scroll at bottom when new messages appear
  scrollToBottom = el => {
    el.scrollTop = el.scrollHeight
  }

  // parses command input and issues correct command
  // calls scrollToBottom() to ensure div overflow remains at bottom
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

  // picks random color for theming
  decideColor() {
    const colors = ['black', 'green', 'blue', 'purple', 'red', 'orange']
    const randInt = Math.floor(Math.random() * 6)
    console.log(randInt)
    return colors[randInt]
  }

  // removes login token and reloads page
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