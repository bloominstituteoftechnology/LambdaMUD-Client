import React from 'react';
import axios from 'axios';

class SignUpForm extends React.Component {
  state = {
    username: '',
    email: '',
    password1: '',
    password2: '',
  };

  userSignUp = e => {
    e.preventDefault();

    console.log(this.state);

    // Make a new user
    const newUser = {
      'username': this.state.username,
      'email': this.state.email,
      'password1': this.state.password1,
      'password2': this.state.password2,
    }

    axios
      .post('https://lambdamud-project-week.herokuapp.com/api/registration/', newUser)

      .then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.key);
        this.setState({username: '', email: '', password1: '', password2: ''});
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
      <form onSubmit={this.userSignUp}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password1">Password</label>
          <input
            name="password1"
            value={this.state.password1}
            onChange={this.handleInputChange}
            type="password1"
          />
        </div>
        <div>
          <label htmlFor="password2">Confirm Password</label>
          <input
            name="password2"
            value={this.state.password2}
            onChange={this.handleInputChange}
            type="password2"
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    )
  }
}

export default SignUpForm;