import React, { Component } from "react";

class HomePage extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1 className="animation-title">LambdaMUD</h1>
        <p className= "login-home">
          <span className="char1 title-first">L</span>
          <span className="char2 title-second">O</span>
          <span className="char3 title-third">G</span>
          <span className="char4 title-first">I</span>
          <span className="char5 title-second">N</span>
        </p>
      </div>
    );
  }
}
export default HomePage;