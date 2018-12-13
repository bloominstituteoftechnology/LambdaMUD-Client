import React from 'react';

class Register extends React.Component {
    state = {
        username: "",
        password1: "",
        password2: "",
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        if (this.state.password1 !== this.state.password2) {
            console.log("Confirmation password does not match")
        } 
        else if (this.state.password1.length < 9 || this.state.password2.length < 9) {
            console.log("The passwords length must be at least 9 characters")
        }
        else {
            this.props.register({
                username: this.state.username,
                password1: this.state.password1,
                password2: this.state.password2,

            })
        }
        this.setState({
            username: "",
            password1: "",
            password2: "",
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <label>
                    <input 
                    name="username"
                    type="text"
                    placeholder="new username"
                    onChange={this.handleChange}
                    value={this.state.username}
                    className="inputs"
                    />
                </label>
                <label>
                    <input 
                    name="password1"
                    type="password"
                    placeholder="password"
                    onChange={this.handleChange}
                    value={this.state.password1}
                    className="inputs"
                    />
                </label>
                <label>
                    <input 
                    name="password2"
                    type="password"
                    placeholder="confirmation password"
                    onChange={this.handleChange}
                    value={this.state.password2}
                    className="inputs"
                    />
                </label>
                <button>Register</button>
            </form>
        )
    }
}

export default Register