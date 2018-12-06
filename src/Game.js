import React, { Component } from "react";
import Pusher from "pusher-js";

class Game extends Component {
  state = {
    title: "",
    description: "",
    players: [],
    name: "",
    error: "",
    messages: [],
    currentRoomId: "",
    uuid: "",
    pusher: new Pusher("1005b1fe28e9877e58c4", {
      cluster: "us2",
      encrypted: true
    })
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

    if (result.error_msg) {
      this.setState({ error: result.error_msg });
    } else {
      this.subscribeToRoom(result.currentRoomId);
      this.getRoomInfo(result);
    }
  }

  subscribeToRoom = roomId => {
    const { pusher } = this.state;
    const channel = pusher.subscribe(`${roomId}`);
    channel.bind("message", data => {
      const { messages, uuid } = this.state;
      const loadedMessages = messages && messages.filter(m => m.id === data.id);
      if (!loadedMessages || loadedMessages.length === 0) {
        if (data.triggeredPlayerUuid !== uuid) {
          this.setState({ messages: [...messages, data] });
        }
      }
    });
  };

  unsubscribeFromRoom = roomId => {
    const { pusher } = this.state;
    pusher.unsubscribe(`${roomId}`);
  };

  getRoomInfo(result) {
    const { currentRoomId, title, description, players, name } = result;
    this.setState(state => ({
      currentRoomId,
      title,
      description,
      players,
      name,
      error: "",
      uuid: result.uuid ? result.uuid : state.uuid
    }));
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

    if (result.error_msg) {
      this.setState({ error: result.error_msg });
    } else {
      this.unsubscribeFromRoom(this.state.currentRoomId);
      this.subscribeToRoom(result.currentRoomId);
      this.getRoomInfo(result);
    }
  };

  sayHelloToCurrentRoom = async () => {
    const result = await fetch(
      `https://lambdamud-server.herokuapp.com/api/adv/say/`,
      {
        method: "POST",
        headers: {
          Authorization: "Token " + this.props.token
        },
        body: JSON.stringify({ message: "Hello everyone!" })
      }
    )
      .then(res => console.log(res))
      // .then(res => res);

    if (result) {
      console.log(result);
    }
  };

  render() {
    const { title, description, players, name, error, messages } = this.state;
    return (
      <div className="game">
        <div className="info">
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
        <div className="channel">
          <div className="list">
            {messages.map(m => (
              <div className="message" key={m.id}>
                {m.message}
              </div>
            ))}
          </div>
          <SpeakIcon onClick={() => this.sayHelloToCurrentRoom()} />
        </div>
        {error && <div className="error">Error: {error}</div>}
      </div>
    );
  }
}

const SpeakIcon = ({ onClick }) => (
  <svg
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="32px"
    height="32px"
    viewBox="0 0 576 576"
    onClick={onClick}
  >
    <g>
      <path
        d="M240,32L240,32c132.549,0,240,86.957,240,194.224S372.549,420.448,240,420.448c-12.729,0-25.223-0.81-37.417-2.355
		C151.03,469.44,91.497,478.647,32,480v-12.567c32.126-15.677,58-44.231,58-76.866c0-4.553-0.356-9.023-1.015-13.396
		C34.706,341.562,0,287.175,0,226.224C0,118.957,107.452,32,240,32z M498,467.343c0,27.973,18.156,52.449,46,65.886V544
		c-51.562-1.159-98.893-9.051-143.57-53.062c-10.57,1.324-21.396,2.021-32.43,2.021c-47.734,0-91.704-12.879-126.807-34.521
		c72.336-0.254,140.629-23.428,192.417-65.336c26.105-21.127,46.697-45.914,61.207-73.675C510.199,289.994,518,258.636,518,226.224
		c0-5.224-0.225-10.418-0.629-15.584C553.656,240.607,576,281.451,576,326.479c0,52.244-30.078,98.86-77.119,129.383
		C498.309,459.608,498,463.44,498,467.343z"
      />
    </g>
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
  </svg>
);

export default Game;
