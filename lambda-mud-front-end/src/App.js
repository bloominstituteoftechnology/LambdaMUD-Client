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

          <Route exact path='/' render={ props =>
              <Game {...props} />
            }
          />

          <Route path='/login' render={ props =>
              <Login {...props} />
            }
          />

          <Route exact path='/register' render={ props =>
              <Register {...props} />
            }
          />

        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
