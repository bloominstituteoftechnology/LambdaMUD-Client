import React, { Component } from 'react'
import axios from 'axios'
import Pusher from 'pusher-js';


/*

apiKey 80eeb993c906974b3e43771d20ad2034f2e88145

description: "North of you, the cave mount beckons"
name: "NewNewTest"

players: Array(4)
0: "alberto"
1: "betotry1"
2: "beto-funk"
3: "check"

title: "Outside Cave Entrance"
uuid: "cf6ca094-d146-444b-ae94-751e514b6d02"

*/

// reg, login
let apiurl = 'https://heromudapp.herokuapp.com/api/'

// init, move, say
let advurl = 'https://heromudapp.herokuapp.com/api/adv/'


class APITest extends Component {

  state = {
    check: '',
    username: '',
    API_KEY: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onclickReg = () => {
    axios({
      method: 'post',
      url: 'https://heromudapp.herokuapp.com/api/registration',
      data: {
        username: this.state.username,
        password1: 'Flintstone',
        password2: 'Flintstone',
      }
    })
    .then(res => {
      console.log(res.data.key)
      this.setState({API_KEY: res.data.key})
    })
    .catch(err => {
      console.log(err)
    });
  }
  
  onclickLog = () => {

    axios({
      method: 'post',
      url: 'https://heromudapp.herokuapp.com/api/login',
      data: {
        username: this.state.username,
        password: 'Flintstone',
      }
    })
    .then(res => {
      console.log(res.data.key)
      this.setState({API_KEY: res.data.key})
    })
    .catch(err => {
      console.log(err)
    });
  }
  
  
  
  onclickInit = () => {
    axios({
      method: 'get',
      url: 'https://heromudapp.herokuapp.com/api/adv/init',
      headers: {'Authorization': `Token ${this.state.API_KEY}`}
    })
    .then(res => {
      console.log(res.data.uuid)
      Pusher.logToConsole = true;
      let pusher = new Pusher('b2b9253c91c4b0f56a74', {
        cluster: 'us2'
      });
      let channel = pusher.subscribe(`mudappchannel-${res.data.uuid}`);
      channel.bind('pusher:subscription_succeeded', function(members) {
        console.log('successfully subscribed!');
      });
      channel.bind('broadcast', function(data) {
        console.log('data',data)
        console.log('message', data.message)
      });
    })
    .catch(err => {
      console.log(err)
    });
  }

  onclickMoveNorth = () => {
    axios({
      method: 'post',
      url: 'https://heromudapp.herokuapp.com/api/adv/move',
      headers: {'Authorization': `Token ${this.state.API_KEY}`},
      data: {
        direction: 'n'
      }
    })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    });
  }
  
  onclickMoveSouth = () => {
    axios({
      method: 'post',
      url: 'https://heromudapp.herokuapp.com/api/adv/move',
      headers: {'Authorization': `Token ${this.state.API_KEY}`},
      data: {
        direction: 's'
      }
    })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    });
  }

  onclickMoveEast = () => {
    axios({
      method: 'post',
      url: 'https://heromudapp.herokuapp.com/api/adv/move',
      headers: {'Authorization': `Token ${this.state.API_KEY}`},
      data: {
        direction: 'e'
      }
    })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    });
  }

  onclickMoveWest = () => {
    axios({
      method: 'post',
      url: 'https://heromudapp.herokuapp.com/api/adv/move',
      headers: {'Authorization': `Token ${this.state.API_KEY}`},
      data: {
        direction: 'w'
      }
    })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    });
  }


  onclickSayHello = () => {
    axios({
      method: 'post',
      url: 'https://heromudapp.herokuapp.com/api/adv/say',
      headers: {'Authorization': `Token ${this.state.API_KEY}`},
      data: {
        message: 'Hey Yall!!'
      }
    })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    });
  }


  render() {

    return (
      <div>
        <h2>{this.state.check}</h2>
        <input
            type="text"
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
          />
        <button onClick={this.onclickReg}>Register</button>
        <button onClick={this.onclickLog}>LogIn</button>


        <br/>
        <hr/>
        <br/>
        <button onClick={this.onclickInit}>Init</button>
        <button onClick={this.onclickMoveNorth}>Move North</button>
        <button onClick={this.onclickMoveSouth}>Move South</button>
        <button onClick={this.onclickMoveEast}>Move East</button>
        <button onClick={this.onclickMoveWest}>Move West</button>
        <button onClick={this.onclickSayHello}>Say Hello</button>
      </div>
    )
  }
}

export default APITest;