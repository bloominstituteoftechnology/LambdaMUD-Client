import React, { Component } from 'react';
import axios from 'axios'
import hkurl from '../../helpers/scripts'
import {Link} from 'react-router-dom'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Card, CardContent, CardHeader, Typography} from '@material-ui/core/';



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
    },
    link:{
       color: theme.palette.primary.dark,
       textDecoration: 'none'
    }
 });


class Login extends Component {
   constructor(){
      super()
      this.state = {
         username: undefined,
         password: undefined,
      }
   }


   componentDidMount(){
      console.log(this)
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

      this.setState({
         [name]: event.target.value,
       });
   }


   render() {
      const { classes } = this.props;
      return (
      <Card id="login-container" className={classes.card} >
         <form onSubmit={this.handleLogin} className={classNames(classes.container, classes.form)} noValidate autoComplete="off">
         <CardContent><Typography variant="headline">Login</Typography></CardContent>
         <div>
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
         </div>
         <div>
            <Button variant="contained" color="primary" className={classes.button} type="submit">Login </Button>
            <Button variant="outlined" color="primary" className={classes.button} ><Link to="/register" className={classes.link}>Sign Up</Link></Button>
         </div>
         </form>
      </Card>
      );
   }
}




export default withStyles(styles)(Login)