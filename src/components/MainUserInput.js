import React from 'react'

class MainUserInput extends React.Component {
  state = {
    direction: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const directions = ["n", "e", "s", "w"]
    if (directions.includes(this.state.direction)) {
      this.props.move({ "direction": this.state.direction })
      this.setState({ direction: "" })
    }
    else {
      this.setState({ direction: "" })
      alert("Enter n, e, s, or w!")
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            name="direction"
            type="text"
            onChange={this.handleChange}
            value={this.state.direction}
          />
          <button type="submit">Send</button>
        </label>
      </form>
    )
  }
}

export default MainUserInput