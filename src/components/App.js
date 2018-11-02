import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import TextWindow from "./Window";
// import axios from 'axios';

// const url = "https://charles-mud.herokuapp.com";



class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/register"
          render={(props) => <Register {...props} submitReg={this.reg} />
          }
        />
        <Route path="/login" component={Login} />
        <Route path="/main" component={TextWindow} />
      </div>
    );
  }
}

export default App;
