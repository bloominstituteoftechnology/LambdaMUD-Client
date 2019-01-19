import React from 'react';
import Login from './Login';

const Authenticate = Protected =>
  class AuthApp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        isLoggedIn: false
      }
    }

    componentDidMount() {
      if (localStorage.getItem('key')) this.setState({
        isLoggedIn: true
      })
    }

    render() {
      return (this.state.isLoggedIn ? <Protected auth={this.props} /> : <Login />);
    }
  }

  export default Authenticate