import React, { Component } from 'react';
import axios from 'axios'
import hkurl from '../../helpers/scripts'
import {Link} from 'react-router-dom'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button} from '@material-ui/core/';


const styles = theme => ({
   container: {
     display: 'flex',
     flexWrap: 'wrap',
   },
   textField: {
     marginLeft: theme.spacing.unit,
     marginRight: theme.spacing.unit,
   },
   dense: {
     marginTop: 16,
   },
   menu: {
     width: 200,
   },
 });


class Login extends Component {
   state = {
      username: undefined,
      password: undefined,
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

   handleChange = name => event => {
      console.log(name)
      console.log(event)
      this.setState({
         [name]: event.target.value,
       });
   }


   render() {
      const { classes } = this.props;

      return (
      <div className="login-container">
         <form onSubmit={this.handleLogin} className={classes.container} noValidate autoComplete="off">
            <TextField
                  id="login-username"
                  label="Username"
                  className={classes.textField}
                  value={this.state.username}
                  onChange={this.handleChange('username')}
                  margin="normal"
                  variant="outlined" />
            <TextField type="password"
                  id="login-password"
                  label="Password"
                  value={this.state.password}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange('password')} />
            <button type="submit">Login</button>
            <Link to="/register">Register</Link>
         </form>
      </div>
      );
   }
}

export default withStyles(Login)