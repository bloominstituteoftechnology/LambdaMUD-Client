import React, { Component } from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Register from './components/Registration';

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
        <Route path='/register' component={Register} />
      </div>
    );
  }
}

export default App;
