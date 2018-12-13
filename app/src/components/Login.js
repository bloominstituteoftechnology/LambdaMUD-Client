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
    

    render() {
        return (
            <form>
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
                <button>Login</button>
            </form>
        )
    }
}

export default Login