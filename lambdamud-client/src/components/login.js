import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleLoginChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log('name: ', event.target.name, event.target.value);
  };

  loginHandler =event => {
    event.preventDefault();
    console.log('LOGIN: ', this.state);

    axios
      // .post('localhost:8000/api/login', this.state)
      .post('https://cs13-lambdamudproject.herokuapp.com/api/login/', this.state)
      .then(res => {
        console.log('response: ', res.data);
        localStorage.setItem('jwt', res.data.key);
        this.props.history.push('/api/adv/init/');
      })
      .catch(err => {
        console.log('Server Error', err);
      });
  }

  render() {
    return (
      <div>
        <h1>LambdaMUD</h1>
        <div>
          <h2>User Login</h2>
          <form>
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={this.state.username}
              onChange={this.handleLoginChange}
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleLoginChange}
            />
          </form>
        </div>
        <button onClick={this.loginHandler}>Login</button>
      </div>
    );
  }
}

export default Login;