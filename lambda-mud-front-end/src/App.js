import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Game from './components/Game';
import Register from './components/Register';
import Login from './components/Login';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path='/' component={Game} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
