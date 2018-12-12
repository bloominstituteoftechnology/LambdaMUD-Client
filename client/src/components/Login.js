import React from 'react';

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
      this.props.login({
        "username": this.state.username,
        "password": this.state.password
      })
    this.setState({
      username: "",
      password: "",
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input 
              name="username"
              type="text"
              placeholder="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
          </label>
          <label>
            <input
              name="password"
              type="password"
              placeholder="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </label>
          <button onClick={console.log("save for toggle")}>Login</button>
          <button>Register</button>
        </form>
      </div>
    )
  }
}

export default Login