import React, { Component } from "react";
import { Link } from "react-router-dom";

class Middleman extends Component {
  state = {};
  render() {
    return (
      <div>
        <Link to="/play">
          <div>Play our awesomegameya</div>
        </Link>
      </div>
    );
  }
}

export default Middleman;
