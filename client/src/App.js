import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './components/Login'
import Init from './components/Init';
import Room from './components/Room';



function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/init" component={Room} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
