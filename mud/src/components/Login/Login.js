import React from 'react'
import axios from 'axios'
import './Login.css'
import CreateUser from './CreateUser'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            newUser: false,
            loggedIn: false,
        }
    }

    componentWillUnmount() {
        this.setState({ newUser: false })
    }

    handleInputChange = (e) => {
        return this.setState({ [e.target.name]: e.target.value });
    }

    createUser = e => {
        e.preventDefault();
        this.setState({ newUser: true })
    }

    newUserClear = e => {
        this.setState({ newUser: false })
    }

    handleCreateSubmit = user => {
        axios
            .post('https://lamb-mud.herokuapp.com/api/registration', user)
            .then(response => {
                console.log(response)
                localStorage.setItem("token", response.data.key);
                localStorage.setItem("username", user.username);
            })
            .catch(err => alert(err.response));
        setTimeout(() => window.location.reload(), 3000)
    }
    handleLoginSubmit = e => {
        e.preventDefault();
        const user = { username: this.state.username, password: this.state.password };
        if (user.username === '' || this.state.password === '') { alert('Please fill out required fields'); return; };
        axios
            .post('https://lamb-mud.herokuapp.com/api/login', user)
            .then(response => {
                console.log('Login response:', response)
                localStorage.setItem("token", response.data.key)
                localStorage.setItem('username', user.username)
            })
            .catch(err => alert(err.response))
        setTimeout(() => window.location.reload(), 3000)

    }

    render() {
        if (this.state.newUser) {
            return <CreateUser newUserClear={this.newUserClear} handleCreate={this.handleCreateSubmit} />
        }
        return (
            <div>
                <img alt="cave-logo" src="/COLOSSUS_CAVE.png" className="bg-image" />

                <div className="login-container">
                    <form onSubmit={this.handleLoginSubmit} className="login-form">
                        <div className="login-image">
                            <img alt="dungeon logo" src="/dungeon_logo.png" className="dungeon-img" />
                        </div>
                        <div className="input-form">
                            <input
                                className="username"
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                placeholder=" Username..."
                            />

                            <input
                                className="username"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                placeholder=" Password"
                            />

                        </div>
                        <div className="button-container">
                            <button type="submit" className="login-button" onSubmit={this.handleLoginSubmit}>Connect</button>
                            <button type="button" className="login-button" onClick={this.createUser}>Create User</button>
                        </div>
                    
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;