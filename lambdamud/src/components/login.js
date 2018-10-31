import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  changer = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handlePWSubmit = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      axios.post('https://lambdam-u-d.herokuapp.com/api/login', this.state).then(res => {
        const token = res.data.key;
        this.setState({
          username: "",
          password: ""
        })
        if (token) {
          this.props.history.push('/gameview');
        } else {
          this.setState({errorMsg: 'Incorrect username or password'})          }
      }).catch(e => console.log(e));
    }
  }
  //** {this.state.errorMsg ? <p>{this.state.errorMsg}</p> : Null} **//

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
