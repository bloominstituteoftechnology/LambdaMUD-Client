import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from '../Login/Login';
import axios from 'axios';

 const URL = process.env.REACT_APP_API;


class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password1:'',
      password2:''
    }
}
    handleClick(event){
        console.log("values",this.state.username,this.state.password1,this.state.password2);
        //To be done:check for empty values before hitting submit
        var self = this;
        var payload={
        "username": this.state.username,
        "password1": this.state.password1,
        "password2": this.state.password2
        }
        axios.post(`${URL}`+'registration', payload)
       .then(function (response) {
         console.log(response);
        
       })
       .catch(function (error) {
         console.log(error);
       });
      
    
    
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             hintText="Enter your Name"
             floatingLabelText="Name"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
            <TextField
             type = "password"
             hintText="Enter Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password1:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password Again"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password2:newValue})}
             />
           <br/>
           <Link to="/login">
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
           </Link>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};

export default Register;
