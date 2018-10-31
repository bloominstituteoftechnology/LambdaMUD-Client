import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// In the Registration component , we have an array of data in the state that is passed down in our handleRegister and
// form in the render
 class Registration extends React.Component {
  state = {
    username: "",
    password1: "",
    password2: ""
  }
   handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // In this function we have an axios that is allowing the user to register to the site, this is coming from
  // the backend server as well that was deployed to heroku.
   handleRegister = e => {
    e.preventDefault();
    const user = { username: this.state.username, password1: this.state.password1, password2: this.state.password2 };
    axios
      .post('https://lambdamud-rd.herokuapp.com/api/registration', user)
      .then(response => {
        localStorage.setItem('key', response.data.key);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }
  // Inside the render is the code for the registration form for Username , Password and to retype Password. 
  // Each input contains type, name, placeholder, value and onChange.
   render() {
    return (
      <div className="login-container">
        <form onSubmit={this.handleRegister}>
          <input 
          type="text"
          name="username"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleInputChange} 
          />
          <input 
          type="password"
          name="password1"
          placeholder="Password"
          value={this.state.password1}
          onChange={this.handleInputChange} 
          />
          <input 
          type="password"
          name="password2"
          placeholder="Re-type password"
          value={this.state.password2}
          onChange={this.handleInputChange} 
          />
          <button type="submit">Register</button>
          <Link to="/login" className="register-link">Login</Link>
        </form>
      </div>
    );
  }
}
 export default Registration;
     
