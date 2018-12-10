import React from "react";
import axios from "axios";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: "",
      location: "",
      description: "",
      players: []
    };
  }
  componentDidMount() {
    this.updateState();
  }
  updateState() {
    const authtoken = localStorage.getItem("token");
    const send = {Authorization:`Token ${authtoken}`};
    console.log(send)
    axios
      .post(`https://tomprojectweekmudserver.herokuapp.com/api/adv/init/`, send)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <h1>Will be filling this up with response stuff soon </h1>
      </div>
    );
  }
}

export default Game;
