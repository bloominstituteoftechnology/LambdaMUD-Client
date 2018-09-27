import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// commponent
import Index from "./component/authe/index";
import Landing from "./component/game/Landing";
import Game from "./component/game/Game";

// css
import "./App.css";

class App extends Component {
	constructor(props) {
		super();
		this.state = {
			isLogedin: Number(localStorage.getItem("isLogedin"))
		};
	}
	handleLogde = bool => {
		bool ? this.setState({ isLogedin: true }) : null;
	};

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Route exact path="/" component={Landing} />
					<Route path="/auth" component={Index} />
					<Route path="/game" component={Game} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
