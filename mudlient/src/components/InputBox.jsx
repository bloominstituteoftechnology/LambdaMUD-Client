// this file contains the html to make the input area
import React, { Component } from "react";
class InputBox extends Component {
  render() {
    return (
      <div className="inputProgram">
        <div className="pcname ">
          {this.props.user}
          @LambdaMUD=>
        </div>
        <div className="inputBoxDemos">
          <span className="inputText">
            {this.props.demosInput}
            <span
              className={
                this.props.demosInput !== "" ? "cursor" : "cursor nochar"
              }
            >
              _
            </span>
          </span>
        </div>
      </div>
    );
  }
}

export default InputBox;
