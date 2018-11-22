import React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      username: "",
      password1: "",
      password2: ""
    };
  }

  submitHandler = e => {
    e.preventDefault();
    const url = "https://charles-mud.herokuapp.com/api/registration";
    axios.post(url, this.state)
    .then(res => {
      console.log("registered ", res.data);
    })
    .then((res) => {
      this.props.history.push('/login');
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
      <div className='container'>
        <Link to='/login' className='link'>Log In</Link>
        <div className="reglog">
          <h2>Registration</h2>
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
                name="password1"
                placeholder="Enter a password"
                type="password"
                onChange={this.changeHandler}
                />
            </span>
            <span>
              <label>Confirm Password: </label>
              <input
                name="password2"
                placeholder="Confirm password"
                type="password"
                onChange={this.changeHandler}
                />
            </span>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
