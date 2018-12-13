import React from 'react';
import axios from 'axios';

class SignInForm extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  };

  // allows us to submit a new user and post it to the API
  userSignIn = event => {
    event.preventDefault();

    console.log(this.state);

    // Submit user information
    const userInfo = {
      'username': this.state.username,
      'email': this.state.email,
      'password': this.state.password,
      
    }

    // POST axios call that submits a new user to login onto a server deployed on heroku
    axios
      .post('https://lambdamud-project-week.herokuapp.com/api/login/', userInfo)

      .then(response => {
        console.log(response);
        // stores the token in local storage
        localStorage.setItem('token', response.data.key);
        // resets the state
        this.setState({username: '', email: '', password: ''});
      })

      .catch(err => {
        console.log(err);
      });
  };

  // allows us to submit username, email and password info for user to login
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div classname='form-main-div'>
      <div className='sin-title-div'>
      <h1>Sign In</h1>
      </div>
      <form onSubmit={this.userSignIn}>
        <div>
          <label htmlFor="username"></label>
          <input 
            className="sin-input"
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
            className="sin-inputs"
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
            className="sin-inputs"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            type="password"
          />
        </div>
        <div>
          <button className="sin-btn" type="submit">Sign In</button>
        </div>
      </form>
      </div>
    );
  }
}

export default SignInForm;