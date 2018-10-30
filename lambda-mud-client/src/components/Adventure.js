import React, { Component } from 'react';
import axios from 'axios';

import Form from './Form';
import TextOutput from './TextOutput';

const MoveDictionary = {
  n: "n",
  s: "s",
  e: "e",
  w: "w",
  north: "n",
  south: "s",
  east: "e",
  west: "w",
}

 class Adventure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: "",
      direction: "",
      message: "",
      output: ""
    };
  }

  getToken() {
    const token = localStorage.getItem('token');
    const requestOptions = {
        headers: {
            authorization: token
        }
      }
    return requestOptions;
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    }

   componentDidMount() {
    const token = this.getToken();
    axios
      .get('https://enigmatic-brook-88093.herokuapp.com/api/adv/init', token)
      .then(response => {
        this.setState(() => ({
            output: response.data
        }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  submitHandler = () => {
    const cmds = this.state.command.split(" ")
    if (cmds[0] === "move"){
        if (MoveDictionary.prototype.hasOwnProperty(cmds[1])){
            this.setState({ direction: MoveDictionary[cmds[1]] })
            .then(() => {
                console.log(this.state.direction)
                //call move
            })
         } else {
            console.log("I don't understand that direction.")
        }
    } else if (cmds[0] === "say") {
        this.setState({ message: cmds[1] })
        .then(() => {
            console.log(this.state.message)
            //call say
        })
    } else {
        console.log("I don't understand that command.")
    }
  }

  move =() => {
    const token = this.getToken();
    axios
    .post('https://enigmatic-brook-88093.herokuapp.com/api/adv/move', {
        direction: this.state.direction
    }, token)
    .then(response => {
      this.setState(() => ({
        output: response.data
      }));
    })
    .catch(error => {
      console.log(error);
    });
  }

  say =() => {
    const token = this.getToken();
    axios.post('https://enigmatic-brook-88093.herokuapp.com/api/adv/say', {
        message: this.state.message
  }, token)
  .then(response => {
    this.setState(() => ({
        output: response.data
    }));
  })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <TextOutput
        title={this.state.title}
        description={this.state.description}
        />
        <Form
        submitHandler={this.submitHandler}
        handleInputChange={this.handleInputChange}
        command={this.state.command}
        />
      </div>
    );
  }
}
 export default Adventure;