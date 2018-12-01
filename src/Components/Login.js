import React, {Component} from "react";
import "../styles/forms.css";
import {Link} from "react-router-dom";
import axios from 'axios';

class Login extends Component {
    state = {
        username: "",
        password: ""
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password
        };
    axios
        .post("https://lisacee-mud.herokuapp.com/api/login", user)
        .then(res => {
            console.log('RESPONSE', res)
        })
        .catch(error => {
            console.log(error.response.data)
        })
    }
    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
              <h3>Login</h3>
              <input type="text" name="username" placeholder="username" onChange={this.handleChange} />
              <input type="text" name="password" placeholder="password" onChange={this.handleChange} />
              <Link to={"/api/adv/init"}>
                <button type="submit">Login</button>
              </Link>
            </form>
          </div>;
    }
}

export default Login;