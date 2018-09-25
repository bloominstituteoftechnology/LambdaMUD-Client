import React from "react";
import Login from './Login';

const Authenticate = Protected =>
  class extends React.Component {
    state = {
      loggedIn: false
    }

    componentDidMount() {
      if (localStorage.getItem('username') && localStorage.getItem('password')) {
        this.setState({
          loggedIn: true
        });
      } else {
        this.setState({
          loggedIn: false
        });
      }
    }

    render() {
      if (this.state.loggedIn) {
        return (
          <Protected />
        );
      } else {
        return (
          <Login />
        );
      }
    }
  };

export default Authenticate;
