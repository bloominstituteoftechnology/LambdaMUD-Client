import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import login from './components/login';
import logo from './logo.svg';
import './App.css';

/* 

heroku links for use later:
https://lambda-mud-alexis-app.herokuapp.com/api/registration/
https://lambda-mud-alexis-app.herokuapp.com/api/login
https://lambda-mud-alexis-app.herokuapp.com/api/adv/say/
https://lambda-mud-alexis-app.herokuapp.com/api/adv/init/

*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Lambda-MUD-Frontend Home Page
          </p>
          <p>
          <Link to='/login' ><button type='button'>Login</button></Link>
          -----------------
          </p>
          <Route  path='/login' component={login} />
        </header>
      </div>
    );
  }
}

export default App;
