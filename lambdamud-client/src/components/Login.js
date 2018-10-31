import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// In the Login component , we have an array of data in the state that is passed down in our handleLogin and
// form in the render
 class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }
   handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

   // In this function we have an axios that is allowing the user to login to the site, this is coming from
  // the backend server as well that was deployed to heroku.
   handleLogin = e => {
    e.preventDefault();
    const credentials = { username: this.state.username, password: this.state.password };
    axios
      .post('https://lambdamud-rd.herokuapp.com/api/login', credentials)
      .then(response => {
        localStorage.setItem('key', response.data.key);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

   // Inside the render is the code for the login form for Username and Password. 
  // Each input contains type, name, placeholder, value and onChange.
   render() {
    return (
      <div className="login-container">
        <form onSubmit={this.handleLogin}>
          <input 
          type="text"
          name="username"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleInputChange} 
          />
          <input 
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleInputChange} 
          />
          <button type="submit">Login</button>
          <Link to="/registration" className="register-link">Register</Link>
        </form>
      </div>
    );
  }
}
 export default Login;