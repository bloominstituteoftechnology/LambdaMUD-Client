import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <h1>Hello from the APP!!</h1>
      <header className="App-header">
        <Switch>
        <Route exact path="/" component={Login} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
