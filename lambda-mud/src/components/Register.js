import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password1: '',
          password2: ''
        }
      }

      handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
      }

      handleSignup = e => {
        e.preventDefault();
        const username = this.state.username;
        const password1 = this.state.password1;
        const password2 = this.state.password2;
        axios
          .post('https://lambda-adv-mud.herokuapp.com/api/registration/',
            {username, password1, password2}).then(response => {
              localStorage.setItem('key', response.data.key);
              this.props.history.push('/');
            }).catch(err => {
          console.log(err);
          })
      }

      render() {
        return (
          <div>
            <form className="login">
            <h1 className="loginTitle">Lambda Notes</h1>
            <h2>Sign Up</h2>
            <div>Username: <input name="username" placeholder="Username"
            onChange={this.handleChange} value={this.state.username} /></div><br/>
            <div>Password: <input type="password" name="password1" placeholder="Password"
            onChange={this.handleChange} value={this.state.password1} /></div><br/>
            <div>Re-enter Password: <input type="password" name="password2" placeholder="Password"
            onChange={this.handleChange} value={this.state.password2} /></div><br/>
            <input className="sidebar-button login-button" type="submit" value="Sign Up" onClick={this.handleSignup} /><br/>
            <NavLink to='/' className="Goto-Login">"Have an account already? Login here"</NavLink>
            </form>
          </div>
        );
      }
}

export default Register