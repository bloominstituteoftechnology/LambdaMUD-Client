
import React, { Component } from 'react'
import '../../index.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
//axios.defaults.withCredentials = true;

export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password1: '',
      password2: '',
      error: '',
    }
  }

  handleSubmit = (authType) => {
    console.log('authType',this.props);
    if (authType === 'register') {
      axios
        .post(`https://lsmud.herokuapp.com/api/${authType}`, {
          username: this.state.username,
          password1: this.state.password1,
          password2: this.state.password2,
        })
        .then(response => {
          console.log('register response', response)
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username);
          this.props.history.push('/');
        })
        .catch(err => this.setState({ error: err }));
    }

    if (authType === 'login') {
      axios
      .post(`https://lsmud.herokuapp.com/api/${authType}`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login response", response)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        this.props.history.push('/');
      }) 
      .catch(err => this.setState({ denied: true }));
    }
}

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let authType = this.props.match.path.slice(1);

    return (
      <div className="App">
        {/* {this.state.denied ? <h4 className="text-center text-danger">Both username and password are required</h4> : null} */}
        <div className="form-group container w-50 register">
          {
            authType === 'login' ? <h3 className="header mt-2">Login</h3>
              : <h3 className="header mt-2">Register</h3>
          }

          <input
            name='username'
            type='text' 
            className="form-control"
            placeholder="Username"
            onChange={(e) => this.handleChange(e)}
          /><br />

          { 
            authType === 'login' ? <input
              name='password'
              type='password' 
              className="form-control"
              placeholder="password"
              onChange={(e) => this.handleChange(e)}
            /> 
            : null 
          }
          <br />

          { 
            authType === 'register' ? <input
              name='password1'
              type='password' 
              className="form-control"
              placeholder="password"
              onChange={(e) => this.handleChange(e)}
            /> 
            : null 
          }
          <br />

          { 
            authType === 'register' ? <input
              name='password2'
              type='password' 
              className="form-control"
              placeholder="confirm password"
              onChange={(e) => this.handleChange(e)}
            /> 
            : null
          }
          <br />

          <button 
            type="submit" 
            className="btn btn-info"
            onClick={() => this.handleSubmit(authType)}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }
}