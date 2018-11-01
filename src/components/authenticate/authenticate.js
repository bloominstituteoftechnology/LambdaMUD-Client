/**
 * Authentication page that checks if user is logged in. If they are it sends
 * them to the main app, otherwise it sends them to the login page.
 */

import React, { Component } from 'react';
import Login from '../login/login';

const Authenticate = App =>
  class extends Component {
      constructor(props) {
          super(props);
          this.state = {
              loggedIn: false
          }
     }

    componentDidMount() {
    if (!localStorage.getItem('key')) {
        this.setState({ loggedIn: false })
    } else {
        this.setState({ loggedIn: true })
    };
    }
    
    loggedIn = () => {
    this.setState({ loggedIn: true });
    }

    loggedOut = () => {
    this.setState({ loggedIn: false });
    }

    render() {
        if (this.state.loggedIn) return <App onLogout={this.loggedOut}/>;
        return <Login loggedIn={this.loggedIn}/>;
    }
}
 
export default Authenticate;