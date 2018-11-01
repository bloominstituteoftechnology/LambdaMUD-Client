import React, { Component } from "react";
import Authenticate from "../Auth/Authenticate";
import { Redirect } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const UserDiv = styled.div`
  background-color: dodgerblue;
  width: 400px;
  margin: 0 auto;
  border-radius: 3px;
  color: white;
  h4 {
    font-weight: bold;
  }
`;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        uuid: "",
        name: "",
        title: "",
        description: "",
        players: []
      },
      direction: ""
    };
  }
  componentDidMount() {
    this.init();
  }
  init = () => {
    const URL = "https://arejay-lambdamud.herokuapp.com/";

    axios
      .get("https://arejay-lambdamud.herokuapp.com/api/adv/init/", {
        headers: {
          Authorization: localStorage.getItem("Authorization")
        }
      })
      .then(response => {
        this.setState({ player: response.data });
      })
      .catch(err => console.log(err.response));
    console.log("we made it ");
  };

  move = e => {
    e.preventDefault();
    axios
      .post("https://arejay-lambdamud.herokuapp.com/api/adv/move/", {
        headers: {
          Authorization: localStorage.getItem("Authorization")
        }
      })
      .then(response => {
        console.log(response.data)
        this.setState({ player: response.data,
                             });
        // if (response.data.error_msg) {
        //   return <UserDiv>{response.data.error_msg}</UserDiv>;
        // }
      })
      .catch(err => err.response);
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    // if token doesn't exist
    //  redirect to login go fuck yourself <Redirect />
    // else
    //  continue to render game component <div>blahblah</div>
    console.log("this.props.location:", this.props.location);
    const location = this.props.location;
    if (!localStorage.getItem("Authorization")) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div>
          <UserDiv>
            <h4>User</h4>
            {this.state.player.name}
          </UserDiv>
          <UserDiv>
            <h4>Location</h4>
            {this.state.player.title}
            <p>{this.state.player.description}</p>
          </UserDiv>
          <UserDiv>
            <h4>Players</h4>
            {this.state.player.players }
          </UserDiv>
          <UserDiv>
            <h4>Errors</h4>
          </UserDiv>
          <UserDiv>
            <h4>Enter the direction you wish to move</h4>
            <form onSubmit={this.move}>
              <input
                onChange={this.handleInputChange}
                placeholder="n, w, s, e"
              />
              <button>></button>
            </form>
          </UserDiv>
          <UserDiv>
            <h4>ChatBox</h4>
          </UserDiv>
          <UserDiv>
            <h4>Speak</h4>
            <form onSubmit={this.move}>
              <input
                onChange={this.handleInputChange}
                placeholder="Say Something"
              />
              <button>></button>
            </form>
          </UserDiv>
        </div>
      );
    }
  }
}

export default Game;
