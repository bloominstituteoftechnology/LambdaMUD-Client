import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hello from the APP!!</h1>
      <header className="App-header">
        <Switch>
        <Route exact path="/login" component={Login} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
