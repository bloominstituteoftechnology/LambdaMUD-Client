//This file has two purposes  one  it serves as a home page, two it serves as the page users are redirected to if they should attempt to go to a path 
//that has not been created. 
import React, { Component } from "react";
import {Link} from 'react-router-dom';
class HomePage extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1 className="animation-title">LambdaMUD</h1>
        <Link to = "/login">
            <p className= "login-home">
            <span className="char1 title-first">L</span>
            <span className="char2 title-second">O</span>
            <span className="char3 title-third">G</span>
            <span className="char4 title-first">I</span>
            <span className="char5 title-second">N</span>
            </p>
        </Link>
      </div>
    );
  }
}
export default HomePage;