import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Login from './components/login';
import Register from './components/register';
import './App.css';




class App extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    }
  }

//-------- Handler Functions----------//

handleChange = event => {
  this.setState({ [event.target.name]: event.target.value })
}

handleLogin = () => {
  const creds = { username: this.state.username, password: this.state.password };

  axios
    .post('https://baldwin-adv-project.herokuapp.com/api/login', creds)
    .then(response => {
      localStorage.setItem('token', response.data.key);
      this.props.history.push('/');
    })
    .catch(error => console.log(error))
}

  render() {
    return (
      <div className="app">

       <Route exact path = "/" render = {props =>
          (<Login {...props}/>)}
        />

        <Route path = '/register' render = {props =>
          (<Register {...props}/>)}
        />

      </div>
    );
  }
}

export default App;
