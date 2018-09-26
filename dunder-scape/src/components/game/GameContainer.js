import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import GameArea from "./GameArea";
import PlayerList from './PlayerList';
const GameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  input {
    color: var(--black);
    width: 100%;
  }
  textarea {
    color: var(--black);
    width: 100%;
    height: 300px;
    resize: none;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 50%;
`;
const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
`;
const PlayerInfoWrapper = styled.div``;

const PlayerInfo = styled.h2`
  font-size: 2.4rem;
`;
class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameLoaded: false,
      playerName: "Unknown",
      currentRoom: "Unknown",
      roomDescription: "Unknown",
      allPlayers: [],
      playerInput: "",
      screenInfo: ""
    };
    this.token = `Token ${localStorage.getItem("mudToken")}`;
    this.baseURL = "http://dunder-scape.herokuapp.com";
  }

  componentDidMount() {
    axios
      .get(`${this.baseURL}/api/adv/init/`, {
        headers: {
          Authorization: this.token
        }
      })
      .then(({ data }) => {
        console.log(data);
        this.setState({
          gameLoaded: true,
          playerName: data.name,
          currentRoom: data.title,
          roomDescription: data.description,
          allPlayers: data.players
        });
      })
      .catch(err => {
        console.log("error initializing game", err);
      });
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  stripCommand = cmd => {
    // Removes the forward slash at the beginning
    return cmd.slice(1);
  };
  moveHandler = () => {
    const requestBody = {
      direction: this.stripCommand(this.state.playerInput)
    };
    axios
      .post(`${this.baseURL}/api/adv/move`, requestBody, {
        headers: {
          Authorization: this.token
        }
      })
      .then(({ data }) => {
        console.log(data);
        let currentScreen = this.state.screenInfo;
        if (data.error_msg !== "") {
          this.setState({
            screenInfo: `${currentScreen}\nYou cannot move that way.`
          });
        } else {
          this.setState({
            currentRoom: data.title,
            roomDescription: data.description,
            screenInfo: `${currentScreen}\nYou are at ${data.title}`,
            allPlayers: data.players
          });
        }
      });
  };
  render() {
    const {
      gameLoaded,
      playerName,
      currentRoom,
      roomDescription,
      allPlayers,
      playerInput,
      screenInfo
    } = this.state;

    if (gameLoaded === false) {
      return <p>Please wait while game is loading.</p>;
    } else {
      return (
        <GameWrapper>
          <LeftPanel>
            <PlayerInfoWrapper>
              <PlayerInfo>Name: {playerName}</PlayerInfo>
              <PlayerInfo>Current Location: {currentRoom}</PlayerInfo>
              <PlayerInfo>Location Description: {roomDescription}</PlayerInfo>
            </PlayerInfoWrapper>
            <GameArea
              moveHandler={this.moveHandler}
              changeHandler={this.changeHandler}
              screenInfo = {screenInfo}
              playerInput = {playerInput}
            />
          </LeftPanel>
          <RightPanel>
            <h2>Players in {currentRoom}</h2>
            <PlayerList players = {allPlayers}/>
          </RightPanel>
        </GameWrapper>
      );
    }
  }
}

export default GameContainer;
