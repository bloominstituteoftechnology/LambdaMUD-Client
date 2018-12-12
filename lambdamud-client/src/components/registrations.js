import React, { Component } from 'react';
import axios from 'axios';
// import styled from 'styled-components';

axios.defaults.withCredentials = true

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password1: '',
      password2: '',
      // mismatch: false
    };
  }

  handleRegistrationChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // addUser = event => {
  //   event.preventDefault();
  //   console.log('STATE: ', this.state);
  //   // var credentials = {"username": this.state.username, "password1": this.state.password1, "password2": this.state.password2}

  //   axios
  //     // .post('localhost:8000/api/registration', this.state)
  //     .post('https://cs13-lambdamudproject.herokuapp.com/api/registration/', this.state)
  //     .then(res => {
  //       console.log('RES:', res.data)
  //       localStorage.setItem('jwt', res.data.key)
  //       this.props.history.push('/api/adv/init/')
  //     })
  //     .catch(err => {
  //       console.log('Server Error', err)
  //     });
  // };

  addUser = event => {
    event.preventDefault();
    const username = this.state.username;
    const password1 = this.state.password1;
    const password2 = this.state.password2;
    // if (password1 !== password2) {
    //     return 
    // }
    const newUser = {
        username,
        password1,
        password2,
    };
    console.log(newUser);
    let data = JSON.stringify({
        username: this.state.username,
        password1: this.state.password1,
        password2: this.state.password2,
    })
    console.log(data);
    axios
        .post('https://cs13-lambdamudproject.herokuapp.com/api/registration/', data, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials:false
        })
        .then(response => {
            console.log(response);
            localStorage.setItem('token', response.data.key);
            this.props.history.push('/api/adv/init')
        })
        .catch(err => console.log(err))

    this.setState({
        username: '',
        password1: '',
        password2: '',
    });
}

// addUser = e => {
//   // e.preventDefault();
//   const userInfo = { username: this.state.username, password1: this.state.password1, password2: this.state.password2 };
//   console.log('userInfo: ', userInfo)

//   axios
//       .post('https://cs13-lambdamudproject.herokuapp.com/api/registration/', userInfo)
//       .then(r => {
//           console.log('r: ', r)
//           localStorage.setItem('token', r.data.key);
//           this.props.history.push('/api/adv/init')
//       })
//       .catch(err => console.log(err.response))
// }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>LambdaMUD</h1>
        <div>
          <h2>Register User</h2>
          <form>
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={this.state.username}
              onChange={this.handleRegistrationChange}
            />
            <input
              type='password'
              name='password1'
              placeholder='Password'
              value={this.state.password1}
              onChange={this.handleRegistrationChange}
            />
            <input
              type='password'
              name='password2'
              placeholder='Confirm Password'
              value={this.state.password2}
              onChange={this.handleRegistrationChange}
            />
          </form>
        </div>
        {/* <div className='mismatch'>
          {this.state.mismatch === false
            ? <p> </p>
            : <p>Passwords do not match! Please try again</p>}
        </div> */}
        <button onClick={this.addUser}>Register</button>
      </div>
    );
  }
}

export default Registration;