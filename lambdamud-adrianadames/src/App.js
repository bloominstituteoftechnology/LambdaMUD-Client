import React, { Component } from 'react';
import './App.css';
import RoomInformation from './Components/RoomInformation';
import RoomActivity from './Components/RoomActivity';
import CommentInput from './Components/CommentInput';
import Register from './Components/Register';
import Login from './Components/Login';
import GameDashboard from './Components/GameDashboard';
import Pusher from 'pusher-js';
import axios from 'axios';
import os from 'os';

// // // // Initialization of the pusher
// // // A connection to Pusher is established by providing your APP_KEY and 
// // // APP_CLUSTER to the constructor function. When you create a new Pusher
// // // object you are automatically connected to Channels.
// const socket = new Pusher('APP_KEY', {
//   cluster: 'APP_CLUSTER',
// });
// // // This ***returns a socket object*** which can then be used to subscribe 
// // // to channels.

// // // // SOCKET IDs
// // // Making a connection provides the client with a new socket_id that is 
// // // assigned by the server. This can be used to distinguish the client's own
// // // events. A change of state might otherwise be duplicated in the client. 
// // // More information on this pattern is available here 
// // // (http://pusherapp.com/docs/duplicates).

// // // It is also stored within the socket, and used as a token for generating 
// // // signatures for private channels.

// // // // // SUBSCRIBING TO CHANNELS
// // // // Public channels
// // // The default method for subscribing to a channel involves invoking the 
// // // subscribe method of your socket object:
// // const channel = socket.subscribe('my-channel');
// // // This returns a Channel object which events can be bound to.

// // // // Private channels
// // // Private channels are created in exactly the same way as normal channels, 
// // // except that they reside in the 'private-' namespace. This means 
// // // prefixing the channel name:
// // //        const channel = socket.subscribe('private-my-channel');

// const channel = socket.subscribe('presence-my-channel');
// const channel = socket.subscribe(`p-channel-${}`);

// // // // Unsubscribing from channels
// // // To unsubscribe from a channel, invoke the unsubscribe method of your 
// // // socket object:
// // //        socket.unsubscribe('my-channel');

// // // // // Binding to events
// // // Event binding takes a very similar form to the way events are handled in
// // // jQuery. You can use the following methods either on a ***channel object,
// // // to bind to events on a particular channel;*** or on the pusher object, 
// // // to bind to events on all subscribed channels simultaneously.

// // // // bind and unbind
// // // Every published event has an "event name". The name of the event below
// // // is 'new-message'. Binding to "new-message" on channel: The following 
// // // logs message data to the console when "new-message" is received:
// // channel.bind('new-message', function (data) {
// //   console.log(data.message);
// // });
// // // // I'll be using this other event here (from the quick-start page):
// // channel.bind('my-event', function(data) {
// //   alert('An event was triggered with message: ' + data.message);
// // });

// // // We can also provide the this value when calling a handler as a third 
// // // optional parameter. The following logs "hi Pusher" when "my-event" is 
// // // fired.
// // //            channel.bind('my-event', function () {
// // //              console.log(`hi ${this.name}`);
// // //            }, { name: 'Pusher' });
// // // Unsubscribe behaviour varies depending on which parameters you provide 
// // // it with. For example:
// // //            // Remove just `handler` for the `new-comment` event
// // //            channel.unbind('new-comment', handler);

// // // // bind_global and unbind_global (<--- skipping notes on this (for now))
// // // // unbind_all (<--- skipping notes on this (for now))


// // // // // Default events
// // // There are a number of events which are used internally, but can also be 
// // // of use elsewhere, for instance subscribe. There is also a state_change 
// // // event - which fires whenever there is a state change. You can use it 
// // // like this:
// //       // pusher.connection.bind('state_change', function(states) {
// //       //   // states = {previous: 'oldState', current: 'newState'}
// //       //   $('div#status').text("Channels current state is " + states.current);
// //       // });

// // // // // Connection Events
// // //To listen for when you connect to Pusher:
// //             // socket.connection.bind('connected', callback);
// // // And to bind to disconnections:
// //             // socket.connection.bind('disconnected', callback);





class App extends Component {
  constructor() {
    super();
    this.state = {
      registerUsername: '',
      registerPassword1: '',
      registerPassword2: '',
      loginUsername: '',
      loginPassword: '',
      playerID: '',
      playerUUID: '',
      playerCurrentRoomID: '',
      playerCurrentRoomTitle: '',
      playerCurrentRoomDescription: '',
      playerCurrentRoomN_to: '',
      playerCurrentRoomS_to: '',
      playerCurrentRoomE_to: '',
      playerCurrentRoomW_to: '',
      playerCurrentRoomPlayerNames: '',
      playerCurrentRoomPlayerUUIDs: '',
      direction: '',
      sayText: ''
    }
  }

  inputChangeHandler = e => {
    e.preventDefault();
    const {name, value} = e.target;
    console.log('name: ', name, 'value: ', value);
    this.setState({[name]: value})
  }

  registerSubmitHandler = e => {
    e.preventDefault();
    let registerData = {
      'username': this.state.registerUsername,
      'password1': this.state.registerPassword1,
      'password2': this.state.registerPassword2
    }
    axios
      // .post('https://lambdamud-adrianadames.herokuapp.com/api/registration', registerData)
      .post('http://127.0.0.1:8000/api/registration', registerData)
      .then(res => {
        const key = res.data['key'];
        localStorage.setItem('key', key);
        console.log('Server response: ', key)
      })
      .catch(err => {
        console.error('Axios failed')
      })
  }

  loginSubmitHandler = e => {
    e.preventDefault();
    let loginData = {
      'username': this.state.loginUsername,
      'password': this.state.loginPassword
    }
    axios
      // .post('https://lambdamud-adrianadames.herokuapp.com/api/login', loginData)
      .post('http://localhost:8000/api/login', loginData)
      .then(res => {
        console.log(loginData)
        console.log('Server response: ', res)
      })
      .catch(err => {
        console.log(loginData)
        console.error('Axios failed :', err)
      })
  }

  initializeSubmitHandler = e => {
    e.preventDefault();
    console.log('check')
    let token = localStorage.getItem('key')
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    }
    console.log('config: ', config)

    axios
      // .get('https://lambdamud-adrianadames.herokuapp.com/api/adv/init/', config)
      .get('http://localhost:8000/api/adv/init', config)
      .then(res => {
        console.log('Server response: ', res)

        const PUSHER_SECRET = os.environ.get('PUSHER_SECRET')

        const CLUSTER = os.environ.get('CLUSTER')

        const socket = new Pusher(PUSHER_SECRET, {
          cluster: PUSHER_CLUSTER,
        })
        console.log('socket: ', socket)

        const channel = socket.subscribe(`p-channel-${res.data.uuid}`);
        console.log('channel: ', channel)

        channel.bind('sayEvent', this.saySubmitHandler)
      })
      .catch(err => {
        console.log('Axios failed: ', err.response)
      })
  }

  moveSubmitHandler = e => {
    e.preventDefault();
    let data = {
      'direction': this.state.direction
    }
    let token = localStorage.getItem('key')
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    }
    console.log(config)

    axios
      // .post('https://lambdamud-adrianadames.herokuapp.com/api/adv/move/', data, config)
      .post('http://127.0.0.1:8000/api/adv/move', data, config)
      .then(res => {
        console.log('Server response: ', res)
      })
      .catch(err => {
        console.log('data: ', data)
        console.log('Axios failed: ', err.response)
      })
  }

  saySubmitHandler = e => {
    e.preventDefault();
    let body = {
      'sayText': this.state.sayText
    }
    let token = localStorage.getItem('key')
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    }
    console.log('config: ', config, 'body :', body)

    axios
      // .post('https://lambdamud-adrianadames.herokuapp.com/api/adv/say/', data, config)
      .post('http://127.0.0.1:8000/api/adv/say', body, config)
      .then(res => {
        console.log('Server response: ', res)
      })
      .catch(err => {
        console.log('Axios failed: ', err.response)
      })
  }


  render() {
    return(
      <div>
        <h1>ADVENTURE GAME!!!!!!!</h1>
        <div>
          <Register 
            registerUsername = {this.state.registerUsername}
            registerPassword1 = {this.state.registerPassword1}
            registerPassword2 = {this.state.registerPassword2}
            inputChangeHandler = {this.inputChangeHandler}
            registerSubmitHandler = {this.registerSubmitHandler}
          />
        </div>

        <div>
          <Login 
            loginUsername = {this.state.loginUsername}
            loginPassword = {this.state.loginPassword}
            inputChangeHandler = {this.inputChangeHandler}
            loginSubmitHandler = {this.loginSubmitHandler}
            initializeSubmitHandler = {this.initializeSubmitHandler}
            moveSubmitHandler = {this.moveSubmitHandler}
            saySubmitHandler = {this.saySubmitHandler}
            sayText = {this.state.sayText}
          />
        </div>
      </div>
    )
  }
}


export default App;