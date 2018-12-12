import React, { Component } from 'react';
import './App.css';
import MainScreen from './MainScreen';
import CreateAccount from './CreateAccount';
import Login from './Login';
import axios from 'axios';

class App extends Component {
	state = {
		loggedIn: false,
		registered: false
	};

	componentDidMount() {
		const token = localStorage.getItem('token');
		if (token) {
			this.setState({ loggedIn: true });
		}
	}

	login = userInfo => {
		axios
		.post('https://lambdamud-backend-travis.herokuapp.com/api/login/', userInfo)
		.then(res => {
			console.log(res)
			localStorage.setItem('token', res.data.key)
			this.setState({ loggedIn: true })
		})
		.catch(err => {
			  console.log(err)
		});
	}

	logout = (e) => {
		e.preventDefault()
		localStorage.clear()
		this.setState({ loggedIn: false })
	}

	createAcc = userInfo => {
		axios.post('https://lambdamud-backend-travis.herokuapp.com/api/registration/', userInfo)
			.then(res => {
				localStorage.setItem('token', res.data.key)
				this.setState({ loggedIn: true })
			})
			.catch(err => console.log(err));
		this.toggleReg()
	}

	toggleReg = () => {
		this.setState({ registered: !this.state.registered })
	}

	render() {
		if (this.state.loggedIn && this.state.registered) {
			return <MainScreen start={this.start} logout={this.logout} />;
		} else if (!this.state.registered) {
			return <CreateAccount toggleReg={this.toggleReg} createAcc={this.createAcc}/>;
		} else if (!this.state.loggedIn) {
			return <Login toggleReg={this.toggleReg} login={this.login}/>;
		}
	}
}

export default App;
