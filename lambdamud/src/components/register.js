// Register component -registers new users

import React from 'react';
import axios from 'axios';

export default class Register extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: ""
    }
  }

  // change username and password in state with dynamic inputs, takes the event and returns updated state
  changer = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

// Registers new user. Takes username and a password (confirmed with password2), returns a token, takes user to gameview
  registerUser = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password1 && this.state.password2) {
      if(this.state.password1 === this.state.password2) {
        axios.post('https://lambdam-u-d.herokuapp.com/api/registration', this.state).then(res => {
          const token = res.data.key;
          this.setState({
            username: "",
            password1: "",
            password2: ""
          });
            localStorage.setItem('key', token);
            this.props.history.push('/gameview');

        }).catch(e =>  console.log(e.response))
        } else {
        this.setState({errorMsg: 'Passwords do not match!'})
      }
    }
  }
  //** {this.state.errorMsg ? <p>{this.state.errorMsg}</p> : Null} **//

  render() {
    return (
        <div>
          <form onSubmit={this.registerUser}>
            <label >Username:</label>
            <input onChange={this.changer} type="text" id="username" name="username" placeholder="Username..." value={this.state.username} />

            <label>Password:</label>
            <input onChange={this.changer} type="text" id="password1" name="password1" placeholder="Password..." value={this.state.password1} />

            <label>Retype password:</label>
            <input onChange={this.changer} type="text" id="password2" name="password2" placeholder="Password..." value={this.state.password2} />

            <button type="submit">Register</button>
          </form>
        </div>
    )
  }
}
