import React, { Component } from 'react';
import axios from 'axios';

import Form from './Form';
import TextOutput from './TextOutput';

import Pusher from 'pusher-js';

 class Adventure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: "",
      direction: "",
      message: "",
      title: "",
      description: "",
      players: "",
      uuid: "",
      MoveDictionary: {
        n: "n",
        s: "s",
        e: "e",
        w: "w",
        north: "n",
        south: "s",
        east: "e",
        west: "w",
      }
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
          title: response.data['title'],
          description: response.data['description'],
          players: response.data['players'].join(", "),
          uuid: response.data['uuid']
        }))
      })
      .then(() => {
        var pusher = new Pusher('20fd2caaca38261dedb4', {
          cluster: 'us2'
        });
        var channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
        channel.bind('broadcast', data => {
          console.log('PUSHER DATA', data)
        });
      }) 
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  submitHandler = () => {
    const cmds = this.state.command.split(" ")
    if (cmds[0] === "move"){
        let dir = cmds[1]
        if (dir in this.state.MoveDictionary){
          this.setState({
            direction: this.state.MoveDictionary[dir]
          }, () => {
            this.move()
          })
         } else {
            console.log("I don't understand that direction.")
        }
    } else if (cmds[0] === "say") {
        let msg = cmds.slice(1).join(", ")
        this.setState({
          message: msg
        }, () => {
          this.say()
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
        title: response.data['title'],
        description: response.data['description'],
        players: response.data['players'].join(", ")
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
  // .then(response => {
  //   console.log(response)
  //   this.setState(() => ({
  //     title: response.data['title'],
  //     description: response.data['description']
  //   }));
  // })
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
        players={this.state.players}
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