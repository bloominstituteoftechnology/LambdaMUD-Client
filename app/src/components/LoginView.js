import React, { Component } from 'react';
import axios from 'axios';


const header = {
  headers: {
    authorization: `TOKEN ${localStorage.getItem('token')}`
  }
}

class Login extends Component {
  state = {
    username:'',
    password: '',
    header: null,
  }

  onFieldNameChange = (e) => {
    console.log({[e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin = (e) => {
    e.preventDefault()
    axios.get('https://muddy-screams.herokuapp.com/api/adv/init/', header)
      .then( response => {
        console.log(response)
        this.redirectToMud(response)
    })
      .catch(e => console.log(e))
  }

  redirectToMud = (r) => {
    this.props.history.push({
      pathname:'/mudview',
      state : {data: r.data}
    })
  }

  render(){
    return (
      <form className="form">
        <label>Username</label>
        <input type="text"  className="register-input"  onChange={this.onFieldNameChange} name="username" />
        <label>Password</label>
        <input type="text" className="register-input" onChange={this.onFieldNameChange} name="password" />
        <input className="register-submit-btn" type="submit" onClick={this.handleLogin} value="Submit" />
      </form>
    )
  }
}

export default Login