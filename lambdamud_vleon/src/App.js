import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Register from "./Components/Register";
import Login from "./Components/Login"
import Chat from "./Components/Chat";
import Game from "./Components/Game";
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

  // componentDidMount() {
  //   axios.get();
  // }

  // getninput = () => {};



  
  // create a post for login 


  // post for direction

  // post for chat


  render() {
    return (
      <div className="mud-container">
        <div className="header">
          <h1>Lambda MUD</h1>
        </div>

        <Route
          exact path="/"
          render={props => {
            return <Chat {...props} />;
          }}
        />
        <Route
          path ="/login"
          render={props => {
            return <Login {...props} />
          }}
          />
        <Route
        path="/registration"
        component={Register}
        />

        <Route path="/game"
        component={Game}/>
      </div>
    );
  }

}

export default App;
