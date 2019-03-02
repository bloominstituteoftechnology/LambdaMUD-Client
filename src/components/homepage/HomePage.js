import React, { Component } from "react";
import {Link} from 'react-router-dom';
import "./homepage.css";

// class homepage is the landing page for anyone not logged in or registered
class HomePage extends Component {
  state = {};
   render() {
    return (
      <div>
        <h1 className="lambda-title">LAMBDA'S ANCIENT ADVENTURE</h1>
        <Link to = "/login">
            <p className= "homepage-login">
            <p className= "login-text">LOGIN</p>
            </p>
        </Link>
        <Link to = "/register">
            <p className= "homepage-login">
            <p className= "login-text">REGISTER</p>
            </p>
        </Link>
      </div>
    );
  }
}
export default HomePage; 