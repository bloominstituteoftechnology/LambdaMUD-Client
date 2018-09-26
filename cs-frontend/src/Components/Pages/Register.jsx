import React, { Component } from 'react';
import axios from 'axios'
import hkurl from '../../helpers/scripts'
import {Link} from 'react-router-dom'
class Register extends Component {
   state = {
      username: "",
      password: "",
   }

  handleRegister = e => {
   e.preventDefault();
   const credentials = { username: this.state.username, password: this.state.password };
   axios
     .post(`${hkurl}/api/registration`, credentials)
     .then(response => {
         console.log(response.data.key)
         localStorage.setItem('key', response.data.key);
         this.props.history.push('/');
     })
     .catch(err => console.log(err.response));
 }

 render() {
   return (
     <div className="registration-container">
       <form onSubmit={this.handleRegister}>
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
         <button type="submit">Register</button>
       </form>
     </div>
   );
 }
}

export default Register