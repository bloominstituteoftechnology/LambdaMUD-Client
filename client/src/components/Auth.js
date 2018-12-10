import React from 'react';

const Auth = App => LoginRegister => class extends React.Component {
	state = { loggedIn: false };
	localStorageKey = 'lambdaMUDToken';
	backendURL = process.env.REACT_APP_BACKEND_URL;

	// Sets loggedIn to true in state when user logs in
	handleLogin = () => this.setState({ loggedIn: true });

	// Removes token from localStorage and sets loggedIn to false
	handleLogout = () => {
		localStorage.removeItem(this.localStorageKey);
		return this.setState({ loggedIn: false });
	};

	// When component first mounts, if token exists in localStorage, it means user
	// is already logged in, so return handleLogin()
	componentDidMount() {
		const token = localStorage.getItem(this.localStorageKey);
		if (token) return this.handleLogin();
	};

	render() {
		const { loggedIn } = this.state;
		// If user is logged in, return the App, else return the LoginRegister
		return loggedIn ?
			<App
				handleLogout = { this.handleLogout }
				backendURL = { this.backendURL }
				localStorageKey = { this.localStorageKey }
			/> :
			<LoginRegister
				handleLogin = { this.handleLogin }
				backendURL = { this.backendURL }
			/>
	}
}

export default Auth;