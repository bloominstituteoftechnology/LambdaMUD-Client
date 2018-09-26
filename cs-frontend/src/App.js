import React, { Component } from 'react';

import Home from './Components/Pages';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    user: null,
    name: null
  };

  componentDidMount = () => {
    //
    userKey = localStorage.getItem('key');
    if (userKey) {
      //
    }
  }; //end CDM

  login = user => {
    this.setState({ user });
  };

  setUserInfo = name => {
    this.setState({ name });
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            {this.user ? (
              <div className="home">//</div>
            ) : (
              <Login setUserInfo={this.setUserInfo} />
            )}
          </Route>
          <Route path="/register">
            <Register setUserInfo={this.setUserInfo} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
