import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import Game from './components/Game'



function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={Login} />           
          <Route exact path="/game" component={Game} />

        </Switch>
      </header>
    </div>
  );
}

export default App;
