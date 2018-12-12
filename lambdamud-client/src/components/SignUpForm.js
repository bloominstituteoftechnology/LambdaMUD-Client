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
      <div classname='form-main-div'>
      <div className='sup-title-div'>
      <h1>Sign Up</h1>
      </div>
      <form onSubmit={this.userSignUp}>
        <div>
          <label htmlFor="username"></label>
          <input className="sup-input"
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
            className="sup-inputs"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password1"></label>
          <input
            className="sup-inputs"
            placeholder="Password"
            name="password1"
            value={this.state.password1}
            onChange={this.handleInputChange}
            type="password1"
          />
        </div>
        <div>
          <label htmlFor="password2"></label>
          <input
            className="sup-inputs"
            placeholder="Confirm Password"
            name="password2"
            value={this.state.password2}
            onChange={this.handleInputChange}
            type="password2"
          />
        </div>
        <div>
          <button className="sup-btn" type="submit">Sign Up</button>
        </div>
      </form>
      </div>
    )
  }
}

export default SignUpForm;