import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './components/Login'
import Init from './components/Init';

const checkAuth = () => {
  const token = localStorage.getItem('token');
  if(!token){ return false }
  return true
}

const PrivateRoute =({ component: Component, ...rest }) => {
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname:'/login' }} />
    ) 
  )} />
}


function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/init" component={Init} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
