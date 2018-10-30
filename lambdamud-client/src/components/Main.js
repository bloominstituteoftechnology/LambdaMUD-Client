import React, { Component } from 'react';
 class Main extends Component {
  constructor() {
    super();
    this.state = {}
  }
   render() {
    return (
      <div classname='main-screen'>
        <p> Main Screen </p>
        <h3>text output area</h3>
        <h3>This will show things such as the game location, items, other player, etc.</h3>
        <form>
          <input type='text' placeholder='user input' />
          <button>Send</button>
        </form>
      </div>
    )
  }
}
 export default Main; 