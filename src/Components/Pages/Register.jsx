import React, { Component } from 'react';
import axios from 'axios'
import helpers from '../../helpers/scripts'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Card, CardContent, Typography} from '@material-ui/core/';
import classNames from 'classnames';

const hkurl = helpers.hkurl

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
    form:{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center'
   },
   card: {
      margin: '30px',
      padding: '10px'
   }
 });


class Register extends Component {
   state = {
      username: "",
      password: "",
   }

  handleRegister = e => {
   e.preventDefault();
   const credentials = { username: this.state.username, password1: this.state.password, password2: this.state.password };
   const options = {
      data: credentials,
      headers: { 'crossDomain': true },
   }
   axios
     .post(`${hkurl}/api/registration/`, credentials)
     .then(response => {
         //receive a token
         console.log(response.data.key)
         const token = response.data.key
         localStorage.setItem('key', token);
         this.props.initializeUser(token)
         this.props.history.push('/');
     })
     .catch(err => console.log(err.response));
 }

 handleChange = name => event => {
  console.log(name)
  this.setState({
     [name]: event.target.value,
   });
}

 render() {
   const { classes } = this.props;
   return (
     <Card className="registration-container" className={classes.card} >
     
       <form onSubmit={this.handleRegister} className={classNames(classes.container, classes.form)} noValidate autoComplete="off">
       <CardContent><Typography variant="headline">Registration</Typography></CardContent>
         <TextField
                id="registration-username"
                label="Username"
                value={this.state.username}
                onChange={this.handleChange('username')}
                margin="normal"
               variant="outlined" />
         <TextField type="password"
                id="registration-password"
                label="Password"
                value={this.state.password}
                onChange={this.handleChange('password')}
                margin="normal"
               variant="outlined" />
         <Button variant="contained" color="primary" className={classes.button} type="submit"> Register </Button>
       </form>
     </Card>
   );
 }
}

export default withStyles(styles)(withRouter(Register))