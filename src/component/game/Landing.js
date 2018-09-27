import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./game.css";
class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="landing">
				<div className="landing__textBox">
					<Link to="/auth/register" className="landing__link">
						Create Account
					</Link>
					<Link to="/auth/login" className="landing__link">
						Start Game
					</Link>
				</div>
			</div>
		);
	}
}

export default Landing;
