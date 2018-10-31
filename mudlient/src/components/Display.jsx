// this file is what makes the lines appear in order

import React, { Component } from 'react';
import Mudname from './Mudname'
class Display extends Component {

  render() {
    return (
      <div className="display">
            <Mudname/>
          
            {this.props.display.map((e, i) => {
              return (
                <div key={i} className="displayLine">
                  {e.time}:{e.message}
                </div>
              );
            })}
          </div>
    );
  }
}

export default Display;