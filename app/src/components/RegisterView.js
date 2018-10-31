import React, { Component } from 'react';
import axios from 'axios';


class Register extends Component {
  state = {
    username:'',
    password1: '',
    password2: '',
  }
  
  onFieldNameChange = (e) => {
    console.log({[e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  }
  
  handleRegister = async (e) => {
    e.preventDefault()
    const user = {
      username: this.state.username,
      password1: this.state.password1,
      password2: this.state.password1,
    }
    try {
      const response = await axios.post('https://muddy-screams.herokuapp.com/api/registration', user)
      console.log(response.data);
      localStorage.setItem("token", response.data.key)
      this.setState({
        username: '',
        password1: '',
        password2: '',
      })
      this.redirectToLogin()
    } catch (e) {
      console.log(e)
    }
    this.redirectToLogin()
    // this.emptyInputFields()
  }

  redirectToLogin = () => {
    this.props.history.push('/login')
  }

  emptyInputFields = () => {
    let form = document.getElementById('form')
    form.reset()
  }

  render(){
    return (
      <form id="form">
        <input type="text" onChange={this.onFieldNameChange} name="username" />
        <input type="text" onChange={this.onFieldNameChange} name="password1" />
        <input type="text" onChange={this.onFieldNameChange} name="password2" />
        <input type="submit" onClick={this.handleRegister} value="Submit" />
      </form>
    )
  }
}

export default Register