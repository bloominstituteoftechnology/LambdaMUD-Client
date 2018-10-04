
import React, { Component } from 'react'
import '../../index.css';
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
    if (authType === 'registration') {
      axios
        .post(`https://lsmud.herokuapp.com/api/${authType}`, {
          username: this.state.username,
          password1: this.state.password1,
          password2: this.state.password2,
        })
        .then(response => {
          console.log('registration response', response)
          localStorage.setItem('token', response.data.token);
          // localStorage.setItem('username', response.data.username);
          this.props.history.push('/view1');
        })
        .catch(error => console.log('error.response', error.response));
    }

    if (authType === 'login') {
      axios
        .post(`https://lsmud.herokuapp.com/api/${authType}`, {
          username: this.state.username,
          password: this.state.password
        })
        .then(response => {
          localStorage.setItem('token', response.data.key);
          //localStorage.setItem('username', response.config);
          this.props.history.push('/view1');
        }) 
        .catch(err => this.setState({ error: true }));
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
        <div className="form-group container w-50">
          {authType === 'login' ? (
              <h2 className="header mt-2">Login</h2>
            ) : (
              <h2 className="header mt-2">Register</h2>
            )
          }

          <input
            name='username'
            type='text' 
            className="form-control"
            placeholder="Username"
            onChange={(e) => this.handleChange(e)}
          />
          <br />

          {authType === 'login' && 
            <input
              name='password'
              type='password' 
              className="form-control"
              placeholder="password"
              onChange={(e) => this.handleChange(e)}
            /> 
          }

          {authType === 'registration' && 
            <input
              name='password1'
              type='password' 
              className="form-control"
              placeholder="password"
              onChange={(e) => this.handleChange(e)}
            />  
          }
          <br />

          {authType === 'registration' && 
            <input
              name='password2'
              type='password' 
              className="form-control"
              placeholder="confirm password"
              onChange={(e) => this.handleChange(e)}
            /> 
          }
          <br />

          <button 
            type="submit" 
            className="btn btn-outline-danger btn-lg"
            onClick={() => this.handleSubmit(authType)}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }
}