import React from "react";

const Authenticate = Protected =>
  class extends React.Component {
    state = {
      loggedIn: false,
      username: ""
    }

    componentDidMount() {
      if (localStorage.getItem('key')) {
        this.setState({ loggedIn: true, username: localStorage.getItem("username") });
      } else {
        this.props.history.push('/login');
      }
    }

    logout = e => {
      e.preventDefault();
      localStorage.setItem("username", "");
      localStorage.setItem("key", "");
      this.setState({ loggedIn: false });
      this.props.history.push('/login');
    }

    render() {
      if (this.state.loggedIn) {
        return (
          <Protected logout={this.logout}
                     username={this.state.username} />
        );
      } else {
        return null;
      }
    }
  };

export default Authenticate;
