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

  render() {
    return(
      <div>
        <form>
          <input type='text' name='command' placeholder='Input Command' onChange={this.handleChange} />
          <button type='submit' onClick={event => this.props.handleCommand(event, this.state.command)}>Enter</button>
        </form>
      </div>
    )
  }
}

export default Command