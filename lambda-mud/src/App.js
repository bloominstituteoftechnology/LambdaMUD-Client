import React, { Component } from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Register from './components/Registration';
import {  Link } from "react-router-dom";
import Login from './components/Login';

class App extends Component {

  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  // handleLogin = (e) => {
  //   e.preventDefault()
  //   const user = {
  //     username: this.state.username,
  //     password: this.state.password
  //   }
  //   axios.post('https://lambda-mud-app.herokuapp.com/api/login', user)
  //   .then((response) => {
  //     console.log(response)
  //     localStorage.setItem({token: response.data.token})
  //   })

  //   this.setState({
  //     username: '',
  //     password: ''
  //   })
  // }

  // handleRegister = async (e) => {
  //   e.preventDefault()
  //   const user = {
  //     username: this.state.username,
  //     password1: this.state.password,
  //     password2: this.state.password,
  //   }
  //   try {
  //     const response = await axios.post('https://lambda-mud-app.herokuapp.com/api/registration', user)
  //     console.log(response)
  //     localStorage.setItem("token", response.data.token)
  //   } catch (e) {
  //     console.log(e)
  //   }
  //   this.setState({
  //     username: '',
  //     password: ''
  //   })
  // }

  render() {
    return (
      <div className="App">
        <Link to='/register' ><button type='button'>Register</button></Link>
        <Link to='/login' ><button type='button'>Login</button></Link>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </div>
    );
  }
}

export default App;
