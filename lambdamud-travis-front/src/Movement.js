import React from 'react'

class Movement extends React.Component {
  state = {
    direction: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const directions = ['n', 'e', 's', 'w']
    if (directions.includes(this.state.direction)) {
      this.props.navigation({ "direction": this.state.direction })
      this.setState({ direction: "" })
    }
    else {
      this.setState({ direction: '' })
      alert('Enter a valid direction (n, s, e, w)')
    }
  }

  render() {
    return (
      <div>
        <input name='direction' type='text' onChange={this.handleChange} value={this.state.direction}/>
        <button onClick={this.handleSubmit} type="submit">Go</button>
      </div>
    )
  }
}

export default Movement