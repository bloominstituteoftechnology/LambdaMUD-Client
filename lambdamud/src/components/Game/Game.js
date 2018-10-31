import React, { Component } from "react";
import Authenticate from "../Auth/Authenticate";
import { Redirect } from "react-router-dom";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // authorization: this.props.location.state.authorization
    };
  }
  render() {
    // if token doesn't exist
    //  redirect to login go fuck yourself <Redirect />
    // else
    //  continue to render game component <div>blahblah</div>
    console.log('this.props.location:', this.props.location);
    const location = this.props.location;
    if (!location.state) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div>
            <h1>Token is {location.state.token}!</h1>
        </div>
      );
    }
  }
}

export default Game;
