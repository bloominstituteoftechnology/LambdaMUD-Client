import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

/*
ToDo
- Handle Errors of requests
- Loaders
- Feedback
- Animations and Transitions
- Cleaner styling / Better theming

Additional Functionality
- look into seeing who is logged in/logged out - maybe implement when Rooms component unmounts(app doesnt unmount til session is closed)
- Show like a little green dot on users that are online
- implement a log out functionality
- look into unsubscribing from pusher channels
- Change 'messages by others' into an array so it shows like the 10most recent messages sent instead of just one mssg
- More rooms
- Items and status(hp) section .. prob on bottom of room description
- Pickup/Drop Items
- Light/dark rooms
- Add all functionality of MUD first project + more
- Add fighting functionality? - users can attack other users, HP
*/


/*
Errors of requests
- Register password error
- Register Existing user error
- Passwords do not match error
- Login user does not exist error
- Login incorrect credentials(user/pass) error
*/

/*
Loaders
- On requests(fetching, success, failure states)
- On log in and register
- On movement
- Maybe on message sent(message sent message should be fine)
*/

/*
Feedback
- Button clicks - maybe shadow/animation
*/

/*
Animation and Transitions
- On Register and Login
- On Movement
- On button clicks maybe

Movement transition idea
- to show direction, highlight the shadow of whatever direction user moves
- then move content toward that direction while opacity goes to 0
- and bring in new content though the corresponding direction while opacity goes to 0
*/

/*
Cleaner styling / Better theming
- Backgrounds

- Animated SVG moving elements - like stars on top, or anything of that sort. 
- Similar to those websites with night sky backgrounds and svg stars moving around in the night sky

- Theme elements
- Change around borders, color, backgrounds, animated svg moving elements, etc
*/

