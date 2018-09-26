import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  };

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  submitHandler = e => {
    e.preventDefault();
    if (this.state.username === '' || this.state.password === '') {
      alert('Please enter credentials!');
      return;
    }
    const user = { 
      username: this.state.username, 
      password1: this.state.password
    };

    axios
      .post('https://adventure-.herokuapp.com/api/login', user)
      .then(response => {
        const token = response.data;
        localStorage.setItem('key', token)
        this.props.history.push('/')
        alert('Success!');
      })
      .catch(err => {
        console.log('Axios Failed')
      });
  };

  render() {
    return (
      <form className="login_form">
        <h2>Login Below</h2>
        <input 
          type="text"
          placeholder="username"
          name="username"
          value={this.state.username}
          onChange={this.inputChangeHandler}
        />
        <br />
        <input 
          type="password"
          placeholder="password"
          name="password"
          value={this.state.password}
          onChange={this.inputChangeHandler}
        />
        <br />
        <button onClick={this.handleLoginSubmit}>Login</button>
      </form>
    )
  }
}

export default Login;