import React, { Component } from "react";
import axios from "axios";
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
    URL = "https://arejay-lambdamud.herokuapp.com/";
    authAxiosHelper = axios.create({
      header: this.state.token,
      baseURL: `${URL}api/adv/init/`
    });
    componentWillMount() {
      this.authAxiosHelper.get().then(response => {
        if (response.uuid) {
          this.setState({ authorized: true });
        } else {
          this.setState({ authorized: false });
        }
      });
    }
    render() {
      return this.state.authorized ? <App /> : <Login />;
    }
  };
export default Authenticate;
