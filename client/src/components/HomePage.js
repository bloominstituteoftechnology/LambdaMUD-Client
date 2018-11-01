import React, { Component } from "react";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="main-screen">
        <p>Home Page</p>
        <h3>Text Output</h3>
        <h3>Location, items, players</h3>
        <form>
          <input type="text" placeholder="User Input" />
          <button>Send Message</button>
        </form>
      </div>
    );
  }
}

export default HomePage;
