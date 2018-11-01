// This is the main game component of the app
// It contains the overall state of the game, and handles all axios calls

import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

import Form from './Form';
import TextOutput from './TextOutput';

import { blue500 } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import HardwareVideogameAsset from 'material-ui/svg-icons/hardware/videogame-asset';
import {Card, CardMedia, CardTitle } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

const styles = {
  card: {
    width: '40%',
    margin: '50px auto auto',
  },
};

 class Adventure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      command: "",
      direction: "",
      message: "",
      title: "",
      description: "",
      players: "",
      uuid: "",
      broadcast: "",
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
  // getToken retrieves the user's token from local storage
  getToken() {
    const token = localStorage.getItem('token');
    const requestOptions = {
        headers: {
            authorization: token
        }
      }
    return requestOptions;
  }
  // Updates state when information is entered into the input field
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    }
  // Responsible for game initialization, this function makes an axios call to init, passing in the saved token
  // It receives player info and current room info which is saved to state
  // Then it subscribes to a Pusher channel, so the user can receive pusher updates
   componentDidMount() {
    const token = this.getToken();
    axios
      .get('https://enigmatic-brook-88093.herokuapp.com/api/adv/init', token)
      .then(response => {
        this.setState(() => ({
          username: response.data['name'],
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
          this.setState({ broadcast: data.message });
        });
      }) 
      .catch(error => {
        console.error('Server Error', error);
      });
  }
  // handles commands from the user input field, first splitting the commands into an array
  // if the first word is 'move', it checks to see if the following word is in the MoveDictionary, then calls the move function
  // if the first word is 'say', it takes all the words after that, joins it into a string, and calls the say function
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
        let msg = cmds.slice(1).join(" ")
        this.setState({
          message: msg
        }, () => {
          this.say()
        })
    } else {
        console.log("I don't understand that command.")
    }
  }
  // this function is called by the submit handler when a legitimate move command is given
  // this function makes an axios call to move, passing in the user's token, and the direction saved on state
  // it gets the new room data and updates state, and it clears the broadcast state
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
        players: response.data['players'].join(", "),
        broadcast: ""
      }));
    })
    .catch(error => {
      console.log(error);
    });
  }
  // this function is called by the submit handler when a legitimate say command is given
  // this function makes an axios call to say, passing in the user's token, and the message saved on state
  say =() => {
    const token = this.getToken();
    axios.post('https://enigmatic-brook-88093.herokuapp.com/api/adv/say', {
        message: this.state.message
  }, token)
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <Card style={styles.card}>
         <ListItem
          disabled={true}
          leftAvatar={ <Avatar icon={<HardwareVideogameAsset />} backgroundColor={blue500}/> }
          >
          {this.state.username}
        </ListItem>
        <Divider />
        <CardMedia
          overlay={<CardTitle title="LambdaMUD" />}
        >
          <img src="https://cdnb.artstation.com/p/assets/images/images/009/411/209/large/a-dolan-dungeoncrawlbig.jpg?1518828264" alt="dragons" />
        </CardMedia>
        <TextOutput
        style={styles.text}
        title={this.state.title}
        description={this.state.description}
        players={this.state.players}
        broadcast={this.state.broadcast}
        />
        <Form
        style={styles.input}
        submitHandler={this.submitHandler}
        handleInputChange={this.handleInputChange}
        command={this.state.command}
        />
      </Card>
    );
  }
}
 export default Adventure;