import React from 'react';
import axios from 'axios';

class SignInForm extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  };

  userSignIn = event => {
    event.preventDefault();

    console.log(this.state);

    // Submit user information
    const userInfo = {
      'username': this.state.username,
      'email': this.state.email,
      'password': this.state.password,
      
    }

    axios
      .post('https://lambdamud-project-week.herokuapp.com/api/login/', userInfo)

      .then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.key);
        this.setState({username: '', email: '', password: ''});
      })

      .catch(err => {
        console.log(err);
      });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.userSignIn}>
        <div>
          <label htmlFor="username"></label>
          <input
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="email"></label>
          <input
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            type="password"
          />
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
    );
  }
}

export default SignInForm;