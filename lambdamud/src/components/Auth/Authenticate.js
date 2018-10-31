import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import Login from "./Login";
import App from "../../App";
import Game from "../Game/Game";

//  Don't need to be doing this this way
const Authenticate = Game =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Authorization: "",
        authorized: false
      };
    }

    URL = "https://arejay-lambdamud.herokuapp.com/";

    componentDidMount() {
      // const authAxiosHelper = axios.create({
      //   header: this.state.Authorization,
      //   baseURL: `${URL}api/adv/init/`
      // });
  
      // this.setState({Authorization: this.props.location.state.authorization})
      console.log("CPD", this.state);
      axios.get(`${URL}/api/adv/init/`, {
        header: {
          Authorization: this.props.location.state.authorization
        }
      })
        .then(response => {
          console.log("we did it", response.data.uuid);
          if (response.data.uuid) {
            this.setState({ authorized: true });
          } else {
            this.setState({ authorized: false });
          }
      });
    }
    render() {
      return this.state.authorized ? <Game /> : <Redirect to='/login' />;
    }
  };
export default Authenticate;
