import React from 'react'
import './Login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleInputChange = (e) => {
        return this.setState({ [e.target.name]: e.target.value });
    }

    createUser = e => {
        alert("You wish muahhaa");
    }
    handleLoginSubmit = e => {
        e.preventDefault();
        const user = this.state.username;
        if (user === '' || this.state.password === '') { alert('Please fill out required fields'); return; };

        window.location.reload();
    }

    render() {
        return (
            <div>
                <img alt="cave-logo" src="https://vignette.wikia.nocookie.net/theamazingworldofgumball/images/9/95/COLOSSUS_CAVE.png/revision/latest?cb=20150206023843" className="bg-image" />

                <div className="login-container">

                    <form onSubmit={this.handleLoginSubmit} className="login-form">
                        <div className="login-image">
                            <img alt="dungeon logo" src="http://www.dungeonraider.net/img/logobig.png" className="dungeon-img" />
                        </div>
                        <div className="input-form">
                            <input
                                className="username"
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                placeholder="Username..."
                            />

                            <input
                                className="username"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                placeholder="Password"
                            />

                        </div>
                        <div className="button-container">
                            <button type="submit" className="login-button" onSubmit={this.handleLoginSubmit}>Login</button>
                            <button type="button" className="login-button" onClick={this.createUser}>Create User</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;