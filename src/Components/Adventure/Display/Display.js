import React, { Component, Fragment } from 'react'

class Display extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      broadcast: []
    }
  }

  componentDidMount() {
    this.setState({ user: this.props.user, broadcast: this.props.broadcast })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ broadcast: this.props.broadcast })
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
                {this.state.broadcast.length > 0  ? (
                  <Fragment>
                    {this.state.broadcast.map(item => {
                      return <p>{item.message}</p>
                    })}
                  </Fragment>
                ) : (
                  <Fragment />
                )}
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