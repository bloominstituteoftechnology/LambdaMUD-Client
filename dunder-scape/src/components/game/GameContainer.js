import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import GameArea from "./GameArea";
import PlayerList from "./PlayerList";
import Pusher from "pusher-js";
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
  justify-content: space-between;
  width: 50%;
`;
const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
      history: []
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
        this.pusher = new Pusher("d162264c53ba2f649fa9", {
          cluster: "us2",
          forceTLS: true
        });
        this.channel = this.pusher.subscribe(`p-channel-${data.uuid}`);
        this.channel.bind('broadcast', ({ message }) => {
          this.setState({
            history: [...this.state.history, message],
          });
        });
        this.channel.bind('say', ({ player_message }) => {
          console.log(player_message);
          this.setState({
            history: [...this.state.history, player_message]
          })
        });
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
  sayHandler = () => {
    const requestBody = {
      message: this.state.playerInput
    }
    axios.post(`${this.baseURL}/api/adv/say`, requestBody, {
      headers: {
        Authorization: this.token
      }
    })
    .then(({ data }) => {
      console.log(data)
      const newHistory = [...this.state.history, `${data.player}: ${data.player_message}`]
      this.setState({
        history: newHistory
      });
    })
  }
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
        const newHistory = this.state.history.slice();

        if (data.error_msg !== "") {

          newHistory.push('You cannot move that way.')
          this.setState({
            history: newHistory
          });

        } else {
          newHistory.push(`You are at ${data.title}`)
          this.setState({
            currentRoom: data.title,
            roomDescription: data.description,
            history: newHistory,
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
      history
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
              sayHandler={this.sayHandler}
              moveHandler={this.moveHandler}
              changeHandler={this.changeHandler}
              playerInput={playerInput}
              history={history}
            />
          </LeftPanel>
          <RightPanel>
            <h2>Players in {currentRoom}</h2>
            <PlayerList players={allPlayers} />
          </RightPanel>
        </GameWrapper>
      );
    }
  }
}

export default GameContainer;
