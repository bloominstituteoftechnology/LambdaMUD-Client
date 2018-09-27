import React, { Component } from 'react';
import axios from 'axios'


class Register extends Component {
  state = {
    username: '',
    password1: '',
    password2: ''
  }

  handler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/registration', this.state)
    .then(res => {
      const token = res.data.key;
      sessionStorage.setItem('key', token);
      this.props.history.push('/adv')
    })
    .catch(err => {
      console.log('axios failed', err.message )
    })
  }

  render() {
    return (
      <div className='reg'>
        <h1>Create an Account...</h1>
        <form onSubmit={this.submitHandler}>
          <input
          name= 'username'
          placeholder='username'
          value= {this.state.username}
          onChange= {this.handler}
          type= 'text'
          />
          <br />
          <input
          name= 'password1'
          placeholder='password'
          value= {this.state.password1}
          onChange= {this.handler}
          type= 'password'
          />
          <br/>
          <input
          name= 'password2'
          placeholder='re-enter password'
          value= {this.state.password2}
          onChange= {this.handler}
          type= 'password'
          />
          <br />
          <button type='submit'>Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
