import React from 'react';
import '../App.css';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
          unAuthenticated: false
        }
      }
    
      handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
      }
    
      handleLogin = e => {
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        axios
          .post('https://lambda-adv-mud.herokuapp.com/api/login/', {username, password})
          .then(response => {
            console.log(response)
            localStorage.setItem('key', response.data.key);
            window.location.reload();
          }).catch(err => {
            this.setState({unAuthenticated: true});
            console.log(`String Error: ${err} and variable error:`, err);
          })
      }
    
      render() {
        return (
          <div>
            <form className="login">
            <h1 className="loginTitle">Lambda Notes</h1>
            <div>Username: <input name="username" placeholder="Username"
            onChange={this.handleChange} value={this.state.username} /></div><br/>
            <div>Password: <input type="password" name="password" placeholder="Password"
            onChange={this.handleChange} value={this.state.password} /><br/>
            <input className="sidebar-button login-button" type="submit" value="Log In" onClick={this.handleLogin} /></div>
            {this.state.unAuthenticated ? <p className="wrong-password">Whoops, wrong username or password, try again</p>: null}
            <NavLink to='/register' className="Goto-Signup">Need an account? Click here to sign up</NavLink>
            </form>
          </div>
        );
      }
}

export default Login