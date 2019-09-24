import React from 'react';
import axios from 'axios';

class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			title: '',
			description: '',
			uuid: '',
			players: []
		};
	}
}

export default Game;
