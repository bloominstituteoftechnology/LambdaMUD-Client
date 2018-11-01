import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/users/")
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="App">
        <Route path="/" component={Home} />
        <Route exact path="/registration" component={Register} />
        <Route exact path="/login" component={Login} />
      </div>
    );
  }
}

export default App;
