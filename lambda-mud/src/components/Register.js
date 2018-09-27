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
          password2: '',
          errror: ''
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
              this.setState({error: err.response.data.error})
          console.error(err.response.data.error);
          })
      }

      render() {
        return (
          <div className="login-page">
            <h1 className="loginTitle">Lambda M.U.D</h1>
            <form className="login register">
            <div>Username: <input name="username" placeholder="Username"
            onChange={this.handleChange} value={this.state.username} /></div><br/>
            <div>Password: <input type="password" name="password1" placeholder="Password"
            onChange={this.handleChange} value={this.state.password1} /></div><br/>
            <div id='re'>Re-enter</div>
            <div>Password: <input type="password" name="password2" placeholder="Password"
            onChange={this.handleChange} value={this.state.password2} /></div>
            <input className="login-button" type="submit" value="Sign Up" onClick={this.handleSignup} /><br/>
            <h5 className='register-error'>{this.state.error}</h5>
            </form>
            <NavLink to='/' className="goto-login signup">Have an account already? Login here</NavLink>
          </div>
        );
      }
}

export default Register