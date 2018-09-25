import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import '../styles/App.css';
import Login from './Login';
import Registration from './Registration';

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
                </header>
                <Route exact path='/' render={() => <Link to='/login'>Login</Link>} />
                <Route path='/login' component={Login} />
                <Route path='/Registration' component={Registration} />
            </div>
        );
    }
}

export default App;
