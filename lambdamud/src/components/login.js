import React from 'react';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  changer = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handlePWSubmit = (event) => {
    const response = await axios.post('https://lambdam-u-d.herokuapp.com/api/login', this.state);
    const token = response.data.key;
    localStorage.setItem('key', token);
    this.props.history.push('/gameview');
  }

  render() {
    return (
        <div>
          <form onSubmit={this.handlePWSubmit}>
            <label >Username:</label>
            <input onChange={this.changer} type="text" id="username" name="username" placeholder="Username..." value={this.state.username} />

            <label>Password:</label>
            <input onChange={this.changer} type="text" id="password" name="password" placeholder="Password..." value={this.state.password} />

            <button type="submit">Log In</button>
          </form>
        </div>
    )
  }
}
