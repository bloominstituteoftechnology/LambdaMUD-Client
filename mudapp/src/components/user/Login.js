import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  onInputChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onLoginSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'https://heromudapp.herokuapp.com/api/login',
      data: {
        username: this.state.username,
        password: this.state.password
      }
    })
    .then(res => {
      this.props.initPlayer(res.data.key)
    })
    .catch(err => {
      console.log('First', err)
    });
  }

  render() {
    return (
      <section  className="Home Login Layer">
        <form onSubmit={this.onLoginSubmit}>
          <div>
            <label htmlFor="loginUsername">Username</label>
            <input
              type="text"
              id="loginUsername"
              name="username"
              value={this.state.username}
              onChange={this.onInputChange}
            />
          </div>

          <div>
            <label htmlFor="loginPassword">Password</label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              value={this.state.password}
              onChange={this.onInputChange}
            />
          </div>

          <button type="submit">Log In</button>
        </form>
      </section>
    )
  }
}

export default Login;
