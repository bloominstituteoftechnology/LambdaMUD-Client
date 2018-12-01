import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import login from './components/login';
import register from './components/register';
import init from './components/init';
import Dan from './DanLazerz.gif';
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
          <img src={Dan} className="App-logo" alt="Dan" />
          <p>
            Lambda-MUD-Frontend Home Page
          </p>
          <p>
          Robo Dan demands you play the game!!
          </p>
          <p>
          <Link to='/game' ><button className="btn game-init-button">Start Game!</button></Link>
          <Link to='/login' ><button className='log-button'>Login</button></Link>
          <Link to='/register' ><button className='reg-button'>Register</button></Link>
          </p>
          {/* Need a route to a home page, "Start Game button" */}
          <Route exact path='/game' component={init} />
          <Route  path='/login' component={login} />
          <Route  path='/register' component={register} />
        </header>
      </div>
    );
  }
}

export default App;
