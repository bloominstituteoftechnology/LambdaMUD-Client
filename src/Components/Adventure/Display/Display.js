import React, { Component } from 'react'

class Display extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const user = this.props.user
      this.setState({ user })
    }
  }

  render() {
    return(
      <div className='adv-container'>
          {this.state.user ? (
            <div className='display'>
              <div className="display-text">
                <p>{`Player: ${this.state.user.name}`}</p>
                <p>{`Location: ${this.state.user.title}`}</p>
                <p>{`Description: ${this.state.user.description}`}</p>
                <p>Players in room:</p>
                <ul>
                  {this.state.user.players.map(player => {
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


export default Display