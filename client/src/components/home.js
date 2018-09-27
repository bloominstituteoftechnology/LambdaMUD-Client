import React, { Component } from 'react';
import axios from 'axios'


class Home extends Component {
  state = {
    username: '',
    password: ''
  }

  handler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  regLink = e => {
    this.props.history.push('/registration')
  }

  submitHandler = e => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/login/', this.state)
    .then(res => {
        console.log(res.data)
      const token = res.data.key;
      sessionStorage.setItem('key', token);
      this.props.history.push('/adv')
    })
    .catch(err => {
      console.log('axios failed')
    })
  }

  render() {
    return (
      <div className='home'>
        <h1>LambdaMUD Sign in</h1>
        <form autoComplete='off' onSubmit={this.submitHandler}>
          <input
          name= 'username'
          placeholder='username'
          value= {this.state.username}
          onChange= {this.handler}
          type= 'text'
          />
          <input
          name= 'password'
          placeholder='password'
          value= {this.state.password}
          onChange= {this.handler}
          type= 'password'
          />
          <button type='submit'>Sign in</button>
          <button className='register' onClick={this.regLink}>Create an Account</button>
        </form>
      </div>
    );
  }
}

export default Home;
