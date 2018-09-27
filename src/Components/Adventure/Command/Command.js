/*******************
 * 
 * Handles user input command with function passed from HOC
 * 
 *******************/

import React, { Component } from 'react'

import './Command.css'

class Command extends Component {
  constructor(props){
    super(props)
    this.state = {
      command: ''
    }
  }

  // handle input form change
  handleChange = event => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }

  // resets form input when command issued, passes event and command to HOC
  submit (event, command) {
    event.preventDefault()
    this.props.handleCommand(event, command)
    this.setState({ command: '' })
  }

  render() {
    return(
      <div className='terminal'>
        <form autoComplete='off'>
          <div className='input'>
          <p>>>></p>
          <input type='text' name='command' value={this.state.command} placeholder='Input Command' onChange={this.handleChange} />
          </div>
          <button type='submit' onClick={event => this.submit(event, this.state.command)}>Enter</button>
        </form>
      </div>
    )
  }
}

export default Command