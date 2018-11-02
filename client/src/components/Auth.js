import React, { Component } from "react";

const Auth = App =>
  class extends Component {
    state = {
      loggedIn: false
    };

    componentDidMount() {
      if (localStorage.getItem("key")) {
        this.setState({ loggedIn: true });
      } else {
        this.props.history.push("/login");
      }
    }

    logout = event => {
      event.preventDefault();
      localStorage.removeItem("key");
      this.setState({ loggedIn: false });
      this.props.history.push("/login");
    };

    render() {
      if (this.state.loggedIn) {
        return <App logout={this.logout} />;
      } else {
        return null;
      }
    }
  };

export default Auth;
