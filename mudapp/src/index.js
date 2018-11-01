import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

/*
ToDo

- Handle Errors
- Loaders
- Animations and Transitions
- Cleaner styling
- Better theming
- Routing(back button) Bug Fix

- Additional Functionality
  - More rooms
  - Items
  - Pickup/Drop Items
  - Light/dark rooms
  - Add all functionality of MUD first project + more

*/
