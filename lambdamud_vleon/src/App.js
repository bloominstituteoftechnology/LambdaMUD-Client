import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Register from "./Components/Register"
import Chat from "./Components/Chat"
import "./App.css";

// const url = ""

class App extends Component {
  state = {
    mudO: {},
    players: "",
    direction: "",
    say: ""
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    axios.get();
  }

  getninput = () => {};



  
  // create a post for login 


  // post for direction

  // post for chat


  render() {
    return (
      <div className="mud-container">
        <div className="header">
          <h1>Lambda MUD</h1>
        </div>

        {/* <Route
          path="/"
          render={props => {
            return <Chat />;
          }}
        /> */}
        {/* <Route
        path="/registration"
        Component={<Register/>}
        /> */}
      </div>
    );
  }
}

export default App;
