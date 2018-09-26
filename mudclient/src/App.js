import React, { Component } from 'react';
import logo from './tiki_logo.png';
import './App.css';
import Register from './components/register';
import Login from './components/login';




class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
      user: {
        username:'',
        isRegistered: false,
        isLoggedIn: false,
      }
    }
    }

  componentDidMount() {
    let token = sessionStorage.getItem('token');
    let username = sessionStorage.getItem('username')
    if(token && username) {
      this.setState({
        user: {'username':username,
        isLoggedIn: true, 
        isRegistered: true, 
      }
      })
    }
  }

  toUpdateUser  = (user) => {
    this.setState({
      user
    })
  }

  render() {

    let registerOrLogin;
    let isLoggedIn = this.state.user.isLoggedIn;
    let isRegistered = this.state.user.isRegistered;
    if (!isRegistered) {
      registerOrLogin = <Register toUpdateUser = {this.toUpdateUser}/>
    
    }
    else if (!isLoggedIn) {
      registerOrLogin = <Login toUpdateUser = {this.toUpdateUser}/> 
    }
    else {
      registerOrLogin = <br/>
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
       {registerOrLogin}

      </div>
    );
  }
}

export default App;
