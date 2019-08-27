import React from 'react';

class Game extends React.Component {
	render() {
		return (
			<div>
				<button>West</button>
				<div>
					<button>North</button>
					<button>South</button>
				</div>
				<button>East</button>
			</div>
		);
	}
}

export default Game;
