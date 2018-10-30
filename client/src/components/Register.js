import React , {Component} from 'react';

class RegisterPage extends Component {
    state = {
        username: "",
        password: "",
        confirmPassword: "",
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }
    render() {

        return (
            <div>
                <h5>UserName</h5>
                <input onChange = {this.handleChange} className ="input-box" placeholder = "Select Username" type="text" value = {this.state.username} name = "username"/>
                <h5>Password</h5>
                <input onChange = {this.handleChange} className ="input-box" type="password" placeholder = "Choose Password" value = {this.state.password} name = "password"/>
                <h5>Confirm Password</h5>
                <input onChange = {this.handleChange} type="password" placeholder = "Retype Password" value = {this.state.password} name = "confirmPassword"/>
                <br/>
                <button>Submit</button>
            </div>
        )
    }
}

export default RegisterPage; 