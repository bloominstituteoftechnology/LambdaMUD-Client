import React, { Component } from "react";

class Game extends Component {
  state = {
    title: "",
    description: "",
    players: []
  };
  async componentDidMount() {
    const result = await fetch(
      `https://lambdamud-server.herokuapp.com/api/adv/init/`,
      {
        method: "GET",
        headers: {
          Authorization: "Token " + this.props.token
        }
      }
    )
      .then(res => res.json())
      .then(res => res);

    if (result) {
      const { title, description, players } = result;
      this.setState({ title, description, players });
    }
  }
  render() {
    const { title, description, players } = this.state;
    return (
      <div className="game">
        <div className="message">
          <p>
            You are in <strong>{title}</strong>
          </p>
          <p>{description}</p>
          <p>
            Other players in this room:{" "}
            {players.map((p, index) => {
              return index == 0 ? (
                <span key={p}>{p}</span>
              ) : (
                <span key={p}>, {p}</span>
              );
            })}
          </p>
        </div>
        <div className="controller">
          <button>West</button>
          <div className="column">
            <button>North</button>
            <button>South</button>
          </div>
          <button>East</button>
        </div>
      </div>
    );
  }
}

export default Game;
