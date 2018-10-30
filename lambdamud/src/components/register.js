import React from 'react';
import axios

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: ""
    }
  }

  changer = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }


  registerUser = (event) => {
    const response = await axios.post('https://lambdam-u-d.herokuapp.com/api/registration', this.state);
    const token = response.data.key;
    localStorage.setItem('key', token);
    this.props.history.push('/gameview');
  }

  render() {
    return (
        <div>
          <form onSubmit={this.registerUser}>
            <label >Username:</label>
            <input onChange={this.changer} type="text" id="username" name="username" placeholder="Username..." value={this.state.username} />

            <label>Password:</label>
            <input onChange={this.changer} type="text" id="password1" name="password1" placeholder="Password..." value={this.state.password1} />

            <label>Retype password:</label>
            <input onChange={this.changer} type="text" id="password2" name="password2" placeholder="Password..." value={this.state.password2} />

            <button type="submit">Register</button>
          </form>
        </div>
    )
  }
}
