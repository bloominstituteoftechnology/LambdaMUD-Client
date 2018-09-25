import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import '../styles/App.css';
import Login from './Login';
import Registration from './Registration';
import Game from './Game';

class App extends Component {
    constructor() {
        super()
        this.state = {
            token: 0
        }
    }
    handleSetToken = (token) => {this.setState({ token })}
    render() {
        return (
            <div className="App">
                <header className="App-header">
                <h1 className="App-title">Welcome to LambdaMUD</h1>
                </header>
                <Route exact path='/' render={() => <Link to='/login'>Login</Link>} />
                <Route path='/login' render={(props) => <Login {...props} setToken={this.handleSetToken} />} />
                <Route path='/registration' render={(props) => <Registration {...props} setToken={this.handleSetToken} />} />
                <Route path='/game' render={(props) => <Game {...props} />} />
            </div>
        );
    }
}

export default App;
