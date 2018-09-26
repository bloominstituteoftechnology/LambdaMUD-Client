import React, { Component } from 'react';
import axios from 'axios'
import hkurl from '../../helpers/scripts'

class Login extends Component {
   state = {
      username: "",
      password: "",
   }

  handleLogin = e => {
   e.preventDefault();
   const credentials = { username: this.state.username, password: this.state.password };
   axios
     .post(`${hkurl}/api/login`, credentials)
     .then(response => {
      console.log(response.data.key)
       localStorage.setItem('key', response.data.key);
       this.props.history.push('/');
     })
     .catch(err => console.log(err.response));
 }

 render() {
   return (
     <div className="login-container">
       <form onSubmit={this.handleLogin}>
         <input type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleInputChange} />
         <input type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleInputChange} />
         <button type="submit">Login</button>
         <Link to="/register">Register</Link>
       </form>
     </div>
   );
 }
}

export default Login