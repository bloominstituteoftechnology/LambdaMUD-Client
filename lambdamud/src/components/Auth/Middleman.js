import React, { Component } from "react";
import { Link } from "react-router-dom";

class Middleman extends Component {
  state = {};
  render() {
   return <Link to="/play"><div>Play our awesomegameya</div></Link>
  }
}

export default Middleman;
