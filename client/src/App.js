import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Login from './components/Login'

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <Switch>
        <Route exact path="/login" component={Login} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
