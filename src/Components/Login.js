import React, {Component} from "react";
import "../styles/forms.css";
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
            localStorage.setItem('Token', res.data.key);
            this.props.history.push('/api/adv/init');
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
                <button type="submit">Login</button>
            </form>
          </div>;
    }
}

export default Login;