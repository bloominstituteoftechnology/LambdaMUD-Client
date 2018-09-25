import React from 'react';
import Authenticate from './components/Authenticate';
import Game from './components/Game';

const App = () => <Game />;

export default Authenticate(App);
