import React from "react";

const Authenticate = Protected =>
  class extends React.Component {
    state = {
      loggedIn: false
    }

    componentDidMount() {
      if (localStorage.getItem('key')) {
        this.setState({ loggedIn: true });
      } else {
        this.props.history.push('/login');
      }
    }

    logout = e => {
      e.preventDefault();
      localStorage.removeItem("key");
      this.setState({ loggedIn: false });
      this.props.history.push('/login');
    }

    render() {
      if (this.state.loggedIn) {
        return (
          <Protected logout={this.logout} />
        );
      } else {
        return null;
      }
    }
  };

export default Authenticate;
