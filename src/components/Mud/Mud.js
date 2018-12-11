import React, { Component } from "react";
import axios from "axios";

class Mud extends Component {
  state = {
    input: {
      direction: ""
    }
  };

  initMud() {
    axios
      .get("https://backend-mud-lambda.herokuapp.com/api/adv/init/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("accessToken")}`
        }
      })
      .then(response => {
        console.log(response);
        document.getElementById("textArea").value += `${
          response.data.title
        }\n\n${response.data.description}`;
        response.data.players.map(p => {
          document.getElementById(
            "textarea"
          ).value += `${p} is standing there.`;
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  move() {
    axios
      .post(
        "https://backend-mud-lambda.herokuapp.com/api/adv/move/",
        this.state.input,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("accessToken")}`
          }
        }
      )
      .then(response => {
        console.log(response);
        document.getElementById("textArea").value += `\n\n${
          response.data.title
        }\n\n${response.data.description}`;
        response.data.players.map(p => {
          document.getElementById(
            "textarea"
          ).value += `${p} is standing there.`;
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = event => {
    this.setState({
      input: {
        ...this.state.input,
        [event.target.name]: event.target.value
      }
    });
  };

  handleSubmit = event => {
    this.move();
  };

  componentDidMount() {
    this.initMud();
  }

  render() {
    return (
      <div>
        <div>
          <textarea rows="20" cols="100" id="textArea" readOnly={true} />
        </div>
        <div>
          <form className="Column-Layout">
            <input
              className="direction"
              value={this.state.input.direction}
              name="direction"
              type="text"
              placeholder="Please type here"
              onChange={this.handleChange}
            />
            <h3 onClick={this.handleSubmit}>Submit</h3>
          </form>
        </div>
      </div>
    );
  }
}

export default Mud;
