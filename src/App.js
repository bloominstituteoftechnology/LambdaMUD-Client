import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import Home from './Components/Pages/Home';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import './App.css';
import axios from 'axios';
import helpers from './helpers/scripts';
import Pusher from 'pusher-js';

const hkurl = helpers.hkurl;

class App extends Component {
  constructor() {
    super();
    this.state = {
      initialResponse: null,
      pusher: null
    };
  }

  componentDidMount = () => {
    const userKey = localStorage.getItem('key');
    if (userKey) {
      this.initializeUser(userKey);
    }
  }; //end CDM

  initializeUser = token => {
    //take the logged in user's key and get their player data from the server
    const authToken = 'Token ' + token;
    const requestOptions = { headers: { Authorization: authToken } };
    axios
      .get(`${hkurl}/api/adv/init/`, requestOptions)
      .then(res => {
        //{"uuid": "c3ee7f04-5137-427e-8591-7fcf0557dd7b",
        // "name": "testuser", "title": "Outside Cave Entrance",
        // "description": "North of you, the cave mount beckons", "players": []}
        //set up app with new user data and location
        console.log(res.data);

        this.setState({ initialResponse: res.data });

        Pusher.logToConsole = true;
        const socket = new Pusher(helpers.APP_KEY, {
          cluster: helpers.APP_CLUSTER,
          forceTLS: true
        });

        console.log('test2');

        var channel = socket.subscribe(`p-channel-${res.data.uuid}`);
        console.log('test3');
        channel.bind('broadcast', function(data) {
          alert(data);
          console.log(data);
        });
        console.log('test4');
        this.setState({ pusher: { socket: socket, channel: channel } });
      })
      .catch(err => {
        //key is wrong, delete key from storage
        console.log(err.response);
        // this.logout();
      });
  };

  logout = () => {
    localStorage.removeItem('key');
  };

  loggedIn = () => {
    const userKey = localStorage.getItem('key');
    console.log(userKey);
    if (userKey) return true;
    else {
      if (this.state.initialResponse) this.setState({ initialResponse: null });
      return false;
    }
  };

  render() {
    console.log(this.props.location);
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            {this.loggedIn() ? (
              <Home
                init={this.state.initialResponse}
                pusher={this.state.pusher}
              />
            ) : (
              <Login initializeUser={this.initializeUser} />
            )}
          </Route>
          <Route path="/register">
            <Register initializeUser={this.initializeUser} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
