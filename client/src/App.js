import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import Room from './components/Room';
import Init from './components/Init';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/init" component={Init} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
