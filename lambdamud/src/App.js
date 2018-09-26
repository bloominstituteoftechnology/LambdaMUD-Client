import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';


class App extends Component {
    constructor() {
        super()
        this.state = {
            token: 0
        }
    }

  componentDidMount() {
    axios
    .get('https://mylambdamud-project.herokuapp.com/admin/')
    .then(response => {
      console.log(response);
      this.setState({admin: response.data});
    })
    .catch(err => {
      console.log(err);
    })
  }

    handleSetToken = (token) => {this.setState({ token })}
    render() {
        return (
            <div className="App">
                <header className="App-header">
                <h1 className="App-title">Welcome to LambdaMUD</h1>
                <p>A Multi-User Dungeon Game</p>
                </header>
                <Route exact path='/' render={() => <Link to='/login'>Login</Link>} />
                <Route path='/login' render={(props) => <Login {...props} setToken={this.handleSetToken} />} />

            </div>
        );
    }
}

export default App;
