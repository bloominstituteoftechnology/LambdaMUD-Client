import React from "react";
import axios from "axios";

const url = "https://lambdamudvleon.herokuapp.com/api/registration/";

// const Register = props => {
//     return (
//         <div>I work</div>
//     );

// Register communicates with the backend with an axios post request to create new users for the game. These new users receive a token, and that is being stored in the browser

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
    if (this.state.password1 !== this.state.password2) {
      return <div>'Passwords do not match'</div>;
    } else {
      axios
        .post(url, newUserInfo)
        .then(response => {
          console.log(response.data.key);
          localStorage.setItem("Token", response.data.key);
          this.props.history.push(`/login`);
        })
        .catch(err => console.log("Error: ", err));
    }
  };

  render() {
    return (
      <div className="register-container">
        <h4>Register</h4>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={this.state.username}
          onChange={this.onChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password1"
          value={this.state.password1}
          onChange={this.onChange}
        />
        <input
          type="password"
          placeholder="verify password"
          name="password2"
          value={this.state.password2}
          onChange={this.onChange}
        />
        <button className="register-btn" onClick={this.newUser}>
          Register
        </button>
      </div>
    );
  }
}

export default Register;
