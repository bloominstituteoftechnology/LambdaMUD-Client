import React, { Component } from 'react';
import axios from 'axios'
import hkurl from '../../helpers/scripts'
import {Link} from 'react-router-dom'
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
   button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
 });


class Register extends Component {
   state = {
      username: undefined,
      password: undefined,
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
   const { classes } = this.props;
   return (
     <div className="registration-container" >
       <form onSubmit={this.handleRegister} className={classes.container} noValidate autoComplete="off">
         <TextField
                id="registration-username"
                label="Username"
                value={this.state.username}
                onChange={this.handleInputChange}
                margin="normal"
               variant="outlined" />
         <TextField type="password"
                id="registration-password"
                label="Password"
                value={this.state.password}
                onChange={this.handleInputChange}
                margin="normal"
               variant="outlined" />
         <Button variant="contained" color="primary" className={classes.button} type="submit"> Register </Button>
       </form>
     </div>
   );
 }
}

export default withStyles(Register)