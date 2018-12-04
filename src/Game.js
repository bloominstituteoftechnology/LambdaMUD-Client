import React, { Component } from "react";

class Game extends Component {
  state = {
    title: "",
    description: "",
    players: [],
    name: "",
    error: ""
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
      this.getRoomInfo(result);
    }
  }

  getRoomInfo(result) {
    if (result.error_msg) {
      this.setState({ error: result.error_msg });
    } else {
      const { title, description, players, name } = result;
      this.setState({ title, description, players, name, error: '' });
    }
  }

  moveToward = async dirChar => {
    const result = await fetch(
      `https://lambdamud-server.herokuapp.com/api/adv/move/`,
      {
        method: "POST",
        headers: {
          Authorization: "Token " + this.props.token
        },
        body: JSON.stringify({ direction: dirChar })
      }
    )
      .then(res => res.json())
      .then(res => res);

    if (result) {
      this.getRoomInfo(result);
    }
  };
  render() {
    const { title, description, players, name, error } = this.state;
    return (
      <div className="game">
        <div className="message">
          <p>
            You are in <strong>{title}</strong>
          </p>
          <p>{description}</p>
          {players.length > 0 && players[0] !== name && (
            <p>
              Other players in this room:{" "}
              {players.map((p, index) => {
                return index === 0 ? (
                  <span key={p}>{p}</span>
                ) : (
                  <span key={p}>, {p}</span>
                );
              })}
            </p>
          )}
        </div>
        <div className="controller">
          <button onClick={() => this.moveToward("w")}>West</button>
          <div className="column">
            <button onClick={() => this.moveToward("n")}>North</button>
            <button onClick={() => this.moveToward("s")}>South</button>
          </div>
          <button onClick={() => this.moveToward("e")}>East</button>
        </div>
        {error && <div className="error">Error: {error}</div>}
      </div>
    );
  }
}

export default Game;
