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
          <Route exact path="/" component={Login} />           
          <Route exact path="/room" component={Room} />
          <Route exact path="/home" component={Init} />

        </Switch>
      </header>
    </div>
  );
}

export default App;
