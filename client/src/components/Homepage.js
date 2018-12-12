import React, { Component } from "react";
import {Link} from 'react-router-dom';
class HomePage extends Component {
  state = {};
   render() {
    return (
      <div>
        <h1 className="lambda-title">LambdaMUD</h1>
        <Link to = "/login">
            <p className= "homepage-login">
            <p className= "login-text">LOGIN</p>
            </p>
        </Link>
      </div>
    );
  }
}
export default HomePage; 