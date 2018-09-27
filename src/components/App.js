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
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to LambdaMUD</h1>
                    {/* Put a how-to/help div here that is hidden by default and displays on click of ? button */}
                </header>
                <Route exact path='/' render={() => <Link to='/login'>Login</Link>} />
                <Route path='/login' render={(props) => <Login {...props} />} />
                <Route path='/registration' render={(props) => <Registration {...props} />} />
                <Route path='/game' render={(props) => <Game {...props} />} />
            </div>
        );
    }
}

export default App;
