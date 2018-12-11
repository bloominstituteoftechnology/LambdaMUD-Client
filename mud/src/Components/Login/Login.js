import React from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      regusername:"",
      regpassword:"",
    };
  }
  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submit = () => {
    let user = { username: this.state.username, password: this.state.password };

    

    axios
      .post(`https://tomprojectweekmudserver.herokuapp.com/api/login/`, user)
      .then(response => {
        console.log(response);
        console.log(response.data.key)
        localStorage.setItem("token", response.data.key)
        window.location.reload()
      })
      .catch(err => {
        console.log(err);
      }); 
      };

      regsubmit = () => {
        const newUser = {
            'username': this.state.regusername,
            'password1': this.state.regpassword,
            'password2': this.state.regpassword,
        }

        axios
        .post(`https://tomprojectweekmudserver.herokuapp.com/api/registration/`, newUser)
        .then(user => {
            console.log(user)
            localStorage.setItem("token",user.data.key)
            window.location.reload()
        })
        .catch(err=> {
            console.log(err)
        })
    }
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="username"
          onChange={this.handleInput}
          value={this.state.username}
          name="username"
        />
        <input
          type="text"
          placeholder="password"
          onChange={this.handleInput}
          value={this.state.password}
          name="password"
        />
        <button onClick={this.submit}>Submit</button>
        <div>
            <h2>Username</h2>
            <input
            type= 'text'
            placeholder= 'Username'
            name = 'regusername'
            onChange= {this.handleInput}
            value= {this.state.regusername}
            ></input>
            <h2>Password</h2>
            <input
            type= 'text'
            placeholder= 'password'
            name = 'regpassword'
            onChange= {this.handleInput}
            value= {this.state.regpassword}
            ></input>
            <button onClick={this.regsubmit}>Register</button>

            </div>
      </div>
    );
  }
}

export default Login;
