import React, { Component } from 'react';
import './App.css';
import RoomInformation from './Components/RoomInformation';
import RoomActivity from './Components/RoomActivity';
import CommentInput from './Components/CommentInput';
import CreateAccount from './Components/CreateAccount';
import Login from './Components/Login';
import GameDashboard from './Components/GameDashboard';
import Pusher from 'pusher-js';

// // Initialization of the pusher
// A connection to Pusher is established by providing your APP_KEY and 
// APP_CLUSTER to the constructor function.
// This returns a socket object which can then be used to subscribe to channels.
const socket = new Pusher(APP_KEY, {
  cluster: APP_CLUSTER,
});
// // SOCKET IDs
// Making a connection provides the client with a new socket_id that is assigned
// by the server. This can be used to distinguish the client's own events. A 
// change of state might otherwise be duplicated in the client. More information 
// on this pattern is available here.

// It is also stored within the socket, and used as a token for generating 
// signatures for private channels.

// // // SUBSCRIBING TO CHANNELS
// // Public channels
// The default method for subscribing to a channel involves invoking the 
// subscribe method of your socket object:
const channel = socket.subscribe('my-channel');
// This returns a Channel object which events can be bound to.

// // Private channels
// Private channels are created in exactly the same way as normal channels, 
// except that they reside in the 'private-' namespace. This means prefixing the
// channel name:
//        const channel = socket.subscribe('private-my-channel');

// // Unsubscribing from channels
// To unsubscribe from a channel, invoke the unsubscribe method of your socket
// object:
//        socket.unsubscribe('my-channel');

// // // Binding to events
// Event binding takes a very similar form to the way events are handled in jQuery. 
// You can use the following methods either on a channel object, to bind to events 
// on a particular channel; or on the pusher object, to bind to events on all 
// subscribed channels simultaneously.

// // bind and unbind
// Binding to "new-message" on channel: The following logs message data to the console
// when "new-message" is received:
//             channel.bind('new-message', function (data) {
//               console.log(data.message);
//             });
// We can also provide the this value when calling a handler as a third optional 
// parameter. The following logs "hi Pusher" when "my-event" is fired.
//            channel.bind('my-event', function () {
//              console.log(`hi ${this.name}`);
//            }, { name: 'Pusher' });
// Unsubscribe behaviour varies depending on which parameters you provide it with. For 
// example:
//            // Remove just `handler` for the `new-comment` event
//            channel.unbind('new-comment', handler);

// // bind_global and unbind_global (<--- skipping notes on this (for now))
// // unbind_all (<--- skipping notes on this (for now))


// // // Default events
// There are a number of events which are used internally, but can also be of use 
// elsewhere, for instance subscribe. There is also a state_change event - which fires 
// whenever there is a state change. You can use it like this:
            // pusher.connection.bind('state_change', function(states) {
            //   // states = {previous: 'oldState', current: 'newState'}
            //   $('div#status').text("Channels current state is " + states.current);
            // });

// // // Connection Events
//To listen for when you connect to Pusher:
            // socket.connection.bind('connected', callback);
// And to bind to disconnections:
            // socket.connection.bind('disconnected', callback);




class App extends Component {
  constructor() {
    super();
    this.state = {
      userRoomSessions: [
        {
          currentRoomName: 'foyer', 
          currentRoomDescription: 'Dark and gloomy', 
          playersInRoom: ['playerB', 'playerC', 'playerQ' ],
          roomActivity: ['playerB : hello', 'playerB: anyone here?', 'playerD: I\'m here!'],
          id: 1
        },
        {
          currentRoomName: 'outside', 
          currentRoomDescription: 'Bright and sunny', 
          playersInRoom: ['playerW', 'playerZ', 'playerY' ],
          roomActivity: ['playerW : hello', 'playerW: anyone here?', 'playerD: I\'m here!'],
          id: 2
        }
      ], 
      userRoomSession: {
        currentRoomName: '', 
        currentRoomDescription: '', 
        playersInRoom: [],
        roomActivity: [],
        id: ''
      },
      commentInput: '',
      commandInput: '',
    }
  }

  addNewRoomSession = (e) => {
    e.preventDefault();
    const userRoomSessions = this.state.userRoomSessions.slice();

    const userRoomSession = {
      currentRoomName: this.state.userRoomSession.currentRoomName,
      currentRoomDescription: this.state.userRoomSession.currentRoomDescription,
      playersInRoom: this.state.userRoomSession.playersInRoom,
      roomActivity: this.state.userRoomSession.roomActivity,
      id: this.state.userRoomSessions.length+1
    }

    const userRoomSessionBlank = {
      currentRoomName: '', 
      currentRoomDescription: '',
      playersInRoom: [],
      roomActivity: [], 
      id: ''
    }

    userRoomSessions.push(userRoomSession);
    this.setState({userRoomSessions: userRoomSessions, userRoomSession: userRoomSessionBlank})
  }

  addComment = (e) => {
    // e.preventDefault();
    const userRoomSessions = this.state.userRoomSessions.slice();
    const userRoomSession = {
      currentRoomName: this.state.userRoomSession.currentRoomName,
      currentRoomDescription: this.state.userRoomSession.currentRoomDescription,
      playersInRoom: this.state.userRoomSession.playersInRoom,
      roomActivity: this.state.userRoomSession.roomActivity,
      id: this.state.userRoomSession.id
    };
    const comment = this.state.comment;
    const id = this.state.userRoomSession.id;
    const roomActivity = this.state.userRoomSession.roomActivity;

    for (let i = 0; i < userRoomSessions.length; i++) {
      if (userRoomSessions[i].id === userRoomSession.id) {
        userRoomSession[roomActivity] = userRoomSession[roomActivity].push(comment);
        userRoomSessions[i] = userRoomSession;
        this.setState(()=> ({userRoomSessions: userRoomSessions}));
      }
    }
  }

  addCommentHandler = e => {
    console.log(e.target.value);

    this.setState({
      commentInput: [e.target.value]
    })
  }

  render() {
    return (
      <div>
        <div>
          <header>
              Adventure game!
          </header>
        </div>

        <div>
          <CreateAccount/>
        </div>

        <div>
          <Login/>
        </div>

        <div>
          <GameDashboard />
        </div>

        <div>
          <RoomInformation 
            currentRoomName = {this.state.userRoomSession.currentRoomName}
            currentRoomDescription = {this.state.userRoomSession.currentRoomDescription}
            playersInRoom = {this.state.userRoomSession.playersInRoom}
          />
        </div>

        <div>
          <RoomActivity 
            roomActivity = {this.state.userRoomSession.roomActivity}
          />
        </div>

        <div>
          <CommentInput 
            addComment = {this.addComment}
            addCommentHandler = {this.addCommentHandler}
            commentInput = {this.state.commentInput}
          />
        </div>
        

      </div>

    );
  }
}

export default App;
