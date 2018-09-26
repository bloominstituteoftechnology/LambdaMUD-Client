import React, { Component } from 'react'

import './Command.css'

class Command extends Component {
  constructor(props){
    super(props)
    this.state = {
      command: ''
    }
  }

  handleChange = event => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }

  submit (event, command) {
    event.preventDefault()
    this.props.handleCommand(event, command)
    this.setState({ command: '' })
  }

  render() {
    return(
      <div>
        <form>
          <input type='text' name='command' value={this.state.command} placeholder='Input Command' onChange={this.handleChange} />
          <button type='submit' onClick={event => this.submit(event, this.state.command)}>Enter</button>
        </form>
      </div>
    )
  }
}

export default Command