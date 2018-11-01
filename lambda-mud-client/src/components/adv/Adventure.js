import React, { Component } from 'react';
import axios from 'axios';

import Form from './Form';
import TextOutput from './TextOutput';

import Pusher from 'pusher-js';

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
        //console.log('init', response)
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