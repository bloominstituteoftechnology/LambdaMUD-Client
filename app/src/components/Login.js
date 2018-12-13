import React from 'react';

class Login extends React.Component {
    state = {
        username: "",
        password: "",
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // This function submits the states login info and makes the post request
    // It also refreshes the State, which should rerender the component
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.login({
            "username": this.state.username,
            "password": this.state.password,
        })
        this.setState({
            username: "",
            password: ""
        })
    }
    

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input 
                    name="username"
                    type="text"
                    placeholder="username"
                    onChange={this.handleChange}
                    value={this.state.username}
                    className="inputs"
                    />
                </label>
                <label>
                    <input 
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    className="inputs"
                    />
                </label>
                <button onClick={this.props.toggleUser}>Login</button>
            </form>
        )
    }
}

export default Login