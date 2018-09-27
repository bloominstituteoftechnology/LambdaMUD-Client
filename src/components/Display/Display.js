
import React, { Component } from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';
const URL = process.env.REACT_APP_API;

class Display extends React.Component {
    state = {
      uuid: "",
      name: "",
      title: "",
      description: "",
      players: [],
      error_msg: "",
      chatString: "",
      history: [],
    }
  
    componentDidMount = () => {
      const key = localStorage.getItem("key")
      axios
        .get(`${URL}`+'adv/init/', { headers: { Authorization: `Token ${key}` } })
        .then(response => {
          this.setState({
            uuid: response.data.uuid,
            name: response.data.name,
            title: response.data.title,
            description: response.data.description,
            players: response.data.players
          })
          console.log(response.data.uuid)
          console.log(this.state.uuid)
        })
        .catch(err => console.log(err));
// class Display extends Component {
//     constructor(props){
//       super(props);
//       this.state={
//         Authorization:'52583b2ac6e9b413a556fbb853a2727bc73fe588'
//       }
//      }
     

    // const payload = 'Authorization: Token 52583b2ac6e9b413a556fbb853a2727bc73fe588'
    // handleClick(event){
        
    //     const AuthStr = 'Token '.concat(this.state.Authorization);
    //     //const AuthStr = this.state.Authorization 
    //     //axios.get(URL, { headers: { Authorization: AuthStr } })         
    //     var payload={ headers: { Authorization: AuthStr } }

    //     console.log(payload)   
    // axios.get(`${URL}`+'adv/init/', payload)
    // .then(function (response) {
    // console.log(response);
    // // if(response.data.status == 200){
    // // console.log("Login successfull");
    //  })
    // .catch(error => {
    //     console.log(error.response)
    //   });
    
    
}
     render() {
        
         return (
        <div className='container'>
        <di className="field">
            <h2>{this.state.name}</h2>
            <h3>{this.state.title}</h3>
            <h4>{this.state.description}</h4>
        </di>
        {/* <MuiThemeProvider className='container'>
        <div>
        Game display
        </div>
        <div>
            <RaisedButton label="Submit" primary={true}  onClick={(event) => this.handleClick(event)}/>
        </div>
        </MuiThemeProvider> */}
        </div>
         );
     }       
}

export default Display;

// var payload=`${"Authorization: Token 52583b2ac6e9b413a556fbb853a2727bc73fe588"}`
// console.log(payload)   
// axios.get(`${URL}`+'init', payload)
//         .then(function (response) {
//         console.log(response);
//         })
        // if(response.data.code === 200){
        // console.log("Login successfull");
        // }}
        // )




//     Request: (Replace token string with logged in user's auth token)
// curl -X GET -H 'Authorization: Token 6b7b9d0f33bd76e75b0a52433f268d3037e42e66' localhost:8000/api/adv/init/
// Response:
// {"uuid": "c3ee7f04-5137-427e-8591-7fcf0557dd7b", "name": "testuser", "title": "Outside Cave Entrance", "description": "North of you, the cave mount beckons", "players": []}
// {Authorization: "Token 52583b2ac6e9b413a556fbb853a2727bc73fe588"}
// Authorization: Token 52583b2ac6e9b413a556fbb853a2727bc73fe588
// const AuthStr = 'Token ' .concat('52583b2ac6e9b413a556fbb853a2727bc73fe588');
// var payload={ headers: { Authorization: AuthStr } }
// console.log(payload)
// axios.get(`${URL}`+'adv/init/', payload)
//     .then(function (response) {
//     console.log(response);
//     // if(response.data.status == 200){
//     // console.log("Login successfull");
//      })
//     .catch(error => {
//         console.log(error.response)
//       });