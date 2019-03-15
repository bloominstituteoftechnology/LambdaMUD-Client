import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import Navbar from './components/Navbar';
import { Route, withRouter } from 'react-router-dom';
// import styled from 'styled-components';
import './App.css';
import axios from 'axios';

const url = 'https://francis-t-lambda-mud.herokuapp.com'
const url1 = process.env.REACT_APP_FRONTEND_URL

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      username: '',
      password: '',
    }
  }
  handleChange = e => {
    this.setState({[e.target.name]:e.target.value})
  }
  logout = e => {
    e.preventDefault();
    localStorage.removeItem('Authorization');
    this.setState({ loggedIn: false })
    this.props.history.push('/login');
  }
  submit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    axios.post(`${url}/api/login`, {
            username: username,
            password: password
        })
        .then( res => {
            this.setState({ loggedIn: true, username: '', password:'' });
            localStorage.setItem('Authorization', `Token ${res.data.key}`)
            this.props.history.push('/game');
        })
        .catch(err => alert(err.message));
  } 
  render() {
    // console.log(this.state.loggedIn)
    return (
      <div>
        <Navbar loggedIn={this.state.loggedIn} logout={this.logout} />
        <div className="App">
          <Route exact path='/login' render={(props) => (
            <Login {...props} 
              handleChange={this.handleChange}
              username={this.state.username}
              password={this.state.password}
              submit={this.submit}
            />
          )} />
          <Route exact path='/registration' component={Register} />
          <Route exact path='/game' component={Game} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
