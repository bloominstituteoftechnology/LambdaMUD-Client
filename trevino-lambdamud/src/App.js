import React, { Component } from 'react';
// import logo from './logo.svg';
import RegisterForm from "./components/MudRegistration";
import LoginForm from "./components/MudLogin";
import Mud from "./components/Mud";
import { withRouter, Route } from "react-router-dom";
import './App.css';

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token === null && localStorage.getItem("savedPage") !== "/signup") {
      this.props.history.push("/login");
    } else if (token === null) {
      this.props.history.push("/signup");
    } else {
      this.props.history.push("/main");
    }
  }
  render() {
    return (
      <div className="App">
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={RegisterForm} />
        <Route exact path="/main" component={Mud} />
      </div>
    );
  }
}

export default withRouter(App);
