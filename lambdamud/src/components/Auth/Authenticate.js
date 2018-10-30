import React, { Component } from "react";
//  Don't need to be doing this this way
const Authenticate = App =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        token: props.token,
        authorized: false
      };
    }
    componentDidMount() {
      if (!this.state.token) {
        this.setState({ authorized: true });
      } else {
        this.setState({ authorized: false });
      }
    }
    render() {
      return this.state.authorized ? <App /> : <Login />;
    }
  };
export default Authenticate;
