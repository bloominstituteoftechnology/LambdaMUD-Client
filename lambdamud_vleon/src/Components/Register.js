import React from "react";
import axios from "axios";

const url = "https://lambdamudvleon.herokuapp.com/api/registration/"

// const Register = props => {
//     return (
//         <div>I work</div>
//     );
// };

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: "",
      Token: ""
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  //creating a post for register

  newUser = event => {
    event.preventDefault();
    const newUserInfo = {
      username: this.state.username,
      password1: this.state.password1,
      password2: this.state.password2
    };
    axios.post(url, newUserInfo).then(response => {
      this.setState({

      });
    });
  };

  render() {
    return (
      <div className="register-container">
        <h4>Register</h4>
        <input
          type="text"
          placeholder="username"
          value={this.state.username}
          onchange={this.onChange}
        />
        <input
          type="password"
          placeholder="password"
          value={this.state.password1}
          onchange={this.onChange}
        />
        <input
          type="password"
          placeholder="verify password"
          value={this.state.password2}
          onchange={this.onChange}
        />
        <div className="register-btn">Register</div>
      </div>
    );
  }
}

export default Register;
