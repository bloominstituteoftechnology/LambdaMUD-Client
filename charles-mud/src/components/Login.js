import React from "react";
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  submitHandler = e => {
    e.preventDefault();
    const url = "https://charles-mud.herokuapp.com/api/login";
    axios.post(url, this.state)
    .then(res => {
      console.log('logged in', res.data);
      localStorage.setItem('key', res.data.key);
    })
    .then((res) => {
      this.props.history.push('/main');
    })
    .catch(err => {
      console.log(err);
    });
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={this.submitHandler}>
          <span>
            <label>Enter Username: </label>
            <input
              name="username"
              placeholder="Enter username"
              onChange={this.changeHandler}
            />
          </span>
          <span>
            <label>Enter Password: </label>
            <input
              name="password"
              placeholder="Enter a password"
              type="password"
              onChange={this.changeHandler}
            />
          </span>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
