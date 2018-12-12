import React from 'react';

class Register extends React.Component {
  state = {
    username: "",
    password1: "",
    password2: "",
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(e.target.value)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.password1 !== this.state.password2) {
      alert("Your Password doesn't match the confirmation Password")
    }
    else if (this.state.password1.length < 9 || this.state.password2.length <9) {
      alert("Your Password must be at least 9 Characters")
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
      <form >
        <label>
          <input 
            name="username"
            type="text"
            placeholder="new username"
            onChange={this.handleChange}
            value={this.state.username}
          />
        </label>
        <label>
          <input
            name="password1"
            type="password"
            placeholder="new password"
            onChange={this.handleChange}
            value={this.state.password1}
          />
        </label>
        <label>
          <input
            name="password2"
            type="password"
            placeholder="confirm password"
            onChange={this.handleChange}
            value={this.state.password2}
          />
        </label>
        <button>Register</button>
        <button onClick={console.log("save for cancel")}>cancel</button>
      </form>
    )
  }
}


export default Register