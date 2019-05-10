import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import RoomInformation from './Components/RoomInformation';
import RoomActivity from './Components/RoomActivity';
import CommandInput from './Components/CommandInput';
import Register from './Components/Register';
import Login from './Components/Login';
import GameDashboard from './Components/GameDashboard';
import Pusher from 'pusher-js';
import axios from 'axios';
import os from 'os';
import Initialize from './Components/Initialize';
import Home from './Components/Home';

//hello adrian


class App extends Component {
  constructor() {
    console.log('Constructor Invoked'); //constructor first thing invoked in mounting lifecycle
    super();
    this.state = {
      registerUsername: '',
      registerPassword1: '',
      registerPassword2: '',
      loginUsername: '',
      loginPassword: '',
      registered: false,
      loggedIn: false,
      playerID: '',
      playerUUID: '',
      playerName: '',
      playerCurrentRoomID: '',
      playerCurrentRoomTitle: 'test',
      playerCurrentRoomDescription: '',
      playerCurrentRoomN_to: '',
      playerCurrentRoomS_to: '',
      playerCurrentRoomE_to: '',
      playerCurrentRoomW_to: '',
      playerCurrentRoomPlayerNames: [],
      playerCurrentRoomPlayerUUIDs: [],
      direction: '',
      sayText: '',
      playerCurrentRoomActivity: [],
      loginErrorMessage: '',
      loginErrorMessageDisplay: 'None',
      errorMessage:null
    };
  };

  inputChangeHandler = e => {
    e.preventDefault();
    const {name, value} = e.target;
    console.log('name: ', name, 'value: ', value);
    this.setState({[name]: value});
  }

  registerSubmitHandler = e => {
    e.preventDefault();
    let registerData = {
      'username': this.state.registerUsername,
      'password1': this.state.registerPassword1,
      'password2': this.state.registerPassword2
    };
    axios
      // .post('https://lambdamud-adrianadames.herokuapp.com/api/registration', registerData)
      .post('http://127.0.0.1:8000/api/registration', registerData)
      .then(res => {
        if (res.data.error){
          console.log(res.data['error']);
          this.setState({errorMessage:res.data.error});
          console.log(this.state.errorMessage);
        }
        else {
          const key = res.data['key'];
          localStorage.setItem('key', key);
          console.log('Server response: ', key);
          this.setState({registered: true, loggedIn:true, errorMessage:null});
        }
      })
      .catch(err => {
        console.error('Axios failed');
        console.log(err)
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

        if (res.data.error){
          console.log(res.data['error']);
          this.setState({errorMessage:res.data.error});
          console.log(this.state.errorMessage);
        }
        else {
          console.log('Login Data: ', loginData);
          console.log('Server response: ', res);
          const key = res.data['key'];
          localStorage.setItem('key', key);
          this.setState({loggedIn: true});
          return this.state.loggedIn;
        }
      })
      .then(res => {
          console.log('If you successfully logged in you should be directed to /initialize.');
          console.log('res: ', res);
      })
      .catch(err => {
        console.log(loginData);
        console.error('Axios failed :', err.response);
        this.loginErrorHandler(err.response);
        // this.setState({loggedIn: false});
      })
  }

  updatePlayerRoomActivity = (activity) => {
    let playerCurrentRoomActivityCopy = this.state.playerCurrentRoomActivity;
    playerCurrentRoomActivityCopy.push(activity);
    this.setState({playerCurrentRoomActivity: playerCurrentRoomActivityCopy});
  }

  initializeSubmitHandler = e => {
    e.preventDefault();
    let token = localStorage.getItem('key');
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    }

    axios
      // .get('https://lambdamud-adrianadames.herokuapp.com/api/adv/init/', config)
      .get('http://localhost:8000/api/adv/init', config)
      .then(res => {
        console.log('Server response 1: ', res);

        // const PUSHER_KEY = os.environ.get('PUSHER_KEY');
        // const PUSHER_CLUSTER = os.environ.get('CLUSTER');

        const PUSHER_KEY = process.env.REACT_APP_PUSHER_KEY;
        const PUSHER_CLUSTER = process.env.REACT_APP_PUSHER_CLUSTER;

        const socket = new Pusher(PUSHER_KEY, {
          cluster: PUSHER_CLUSTER,
        });
        const channel = socket.subscribe(`p-channel-${res.data.uuid}`);
        // console.log('socket: ', socket);
        // console.log('channel: ', channel);

        let updatePlayerRoomActivityCopy = this.updatePlayerRoomActivity;

        channel.bind('sayEvent', function(data) {
          console.log(data['message']);
          updatePlayerRoomActivityCopy(data['message'])
        });
        channel.bind('broadcast', function(data) {
          console.log(data['message']);
          updatePlayerRoomActivityCopy(data['message'])
        });
        return res;
      })
      .then(res=> {
        this.setState({
          playerCurrentRoomTitle: res.data.title,
          playerCurrentRoomDescription: res.data.description,
          playerCurrentRoomPlayerNames: res.data.players,
        })
        // console.log('State:', this.state)
      })
      .catch(err => {
        console.log('Axios failed: ', err.response);
      })
  }

  moveSubmitHandler = e => {
    e.preventDefault();
    let data = {
      'direction': this.state.direction
    }
    let token = localStorage.getItem('key');
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    }

    axios
      // .post('https://lambdamud-adrianadames.herokuapp.com/api/adv/move/', data, config)
      .post('http://127.0.0.1:8000/api/adv/move', data, config)
      .then(res => {
        console.log('Server response: ', res);
        return res;
      })
      .then(res => {
        if (res.data['error_msg'] === 'You cannot move that way.') {
          this.updatePlayerRoomActivity('You can\'t move that way.');
        }
        else {
          this.setState({
            playerCurrentRoomTitle: res.data.title,
            playerCurrentRoomDescription: res.data.description,
            playerCurrentRoomPlayerNames: res.data.players,
            playerCurrentRoomActivity: []
          });
        }
        console.log('State:', this.state);
      })
      .catch(err => {
        console.log('data: ', data);
        console.log('Axios failed: ', err.response);
      })
  }

  saySubmitHandler = e => {
    e.preventDefault();
    let data = {
      'sayText': this.state.sayText
    }
    let token = localStorage.getItem('key');
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    }
    console.log('config: ', config, 'data :', data);

    axios
      // .post('http://lambdamud-adrianadames.herokuapp.com/api/adv/say/', data, config)
      .post('http://127.0.0.1:8000/api/adv/say', data, config)
      .then(res => {
        console.log('Server response: ', res);
      })
      .catch(err => {
        console.log('data: ', data);
        console.log('Axios failed: ', err.response);
      })
  }

  componentDidMount() {
    console.log('componentDidMount Invoked!');
    // this.setState[{playerCurrentRoomTitle: "playerCurrentRoomTitleTEST" }];
    // console.log(this.state)

    // const loginErrMessage = this.state.loginErrorMessage;
    // if (loginErrMessage) {
    //   console.log('check check');
    // }
  }

  render() {
    console.log("Render Invoked!");
    return(
      <AppContainerStyledDiv>
        
        {/* HOME COMPONENT */}
        {/* <Route exact path = "/" component={Home} /> */}
        {/* <Route exact path = "/" render = {() =>
           <Login 
              loginUsername = {this.state.loginUsername}
              loginPassword = {this.state.loginPassword}
              inputChangeHandler = {this.inputChangeHandler}
              loginSubmitHandler = {this.loginSubmitHandler}
              loginErrorMessage = {this.state.loginErrorMessage}
              loginErrorMessageDisplay= {this.state.loginErrorMessageDisplay}
          />
        }
        /> */}

        <PrivateRoute exact path = "/" component = {GameDashboard} />

        {/* REGISTER COMPONENT */}
        <Route path = "/register" render = {() => (
          this.state.registered ? (
            <Redirect to ='/dashboard' />
          ) : (
          <Register 
            registerUsername = {this.state.registerUsername}
            registerPassword1 = {this.state.registerPassword1}
            registerPassword2 = {this.state.registerPassword2}
            inputChangeHandler = {this.inputChangeHandler}
            registerSubmitHandler = {this.registerSubmitHandler}
            errorMessage = {this.state.errorMessage}
          />
          )
        )}
        />

        {/* LOGIN COMPONENT */}
        <Route path = "/login" render = {() =>
           <Login 
              loginUsername = {this.state.loginUsername}
              loginPassword = {this.state.loginPassword}
              inputChangeHandler = {this.inputChangeHandler}
              loginSubmitHandler = {this.loginSubmitHandler}
              errorMessage = {this.state.errorMessage}
          />
        }
        />

        {/* INITIALIZE COMPONENT */}
        <Route path = "/initialize" render = {() =>
          <Initialize 
            initializeSubmitHandler = {this.initializeSubmitHandler}
          />
        }
        />

        <Route path = "/dashboard" render = {() =>
          <GameDashboard
            playerCurrentRoomTitle = {this.state.playerCurrentRoomTitle}
            playerCurrentRoomDescription = {this.state.playerCurrentRoomDescription}
            playerCurrentRoomPlayerNames = {this.state.playerCurrentRoomPlayerNames} 
            playerCurrentRoomActivity = {this.state.playerCurrentRoomActivity}
            moveSubmitHandler = {this.moveSubmitHandler}
            saySubmitHandler = {this.saySubmitHandler}
            sayText = {this.state.sayText}
            inputChangeHandler = {this.inputChangeHandler}
          />
        }/>

        {/* <Route path = "/dashboard" render = {() =>
          <div>
            <RoomInformationContainerStyledDiv>
              <RoomInformation 
                playerCurrentRoomTitle = {this.state.playerCurrentRoomTitle}
                playerCurrentRoomDescription = {this.state.playerCurrentRoomDescription}
                playerCurrentRoomPlayerNames = {this.state.playerCurrentRoomPlayerNames}
              />
            </RoomInformationContainerStyledDiv>

            <RoomActivityContainerStyledDiv>
              <RoomActivity 
                playerCurrentRoomActivity = {this.state.playerCurrentRoomActivity}
              />
            </RoomActivityContainerStyledDiv>
            
            <CommandInputContainerStyledDiv>
              <CommandInput 
                moveSubmitHandler = {this.moveSubmitHandler}
                saySubmitHandler = {this.saySubmitHandler}
                sayText = {this.state.sayText}
                inputChangeHandler = {this.inputChangeHandler}
              />
            </CommandInputContainerStyledDiv>
            
          </div> 
        }
        /> */}
      </AppContainerStyledDiv>
    )
  }
}

{/* <PrivateRoute exact path = "/" component = {GameDashboard} /> */}

const PrivateRoute = ({component: Component, ...rest}) => { //...rest of the props passed to the component
  return (
    <Route {...rest} render = {(props) => (
      false === true
        ? <Component {...props} />  // props here are location, match, and history
        : <Redirect to = '/login'/>
    )}/>
  )
}



// const PrivateRoute = ({component: Component, ...rest}) => ( //...rest of the props passed to the component
//   <Route {...rest} render = {(props) => (
//     true === true
//       ? <Component {...props} />  // props here are location, match, and history
//       : <Redirect to = '/login'/>
//   )}/>
// )


const AppContainerStyledDiv = styled.div`
  display:flex;
  width: 900px;
  border: 1px solid black;
  margin-left:10px;
  margin-right:10px;
`
// const RoomInformationContainerStyledDiv = styled.div`
//   display:flex;
// `
// const RoomActivityContainerStyledDiv = styled.div`
//   display:flex;
// `
// const CommandInputContainerStyledDiv = styled.div`
//   display:flex;
// `

export default App;








// // // // // -------------NOTES FROM PUSHER DOCUMENTATION-------------

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
