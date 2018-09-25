
/*import './index.css';*/
// import NotesList from '../NotesList/NotesList'
// import NoteView from '../NoteView/NoteView';
// import CreateNote from '../CreateNote/CreateNote';
// import EditNote from '../EditNote/EditNote';
import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import { FormGroup, Col, Form, ControlLabel, FormControl, Checkbox, Button } from 'react-bootstrap'

class Login extends Component {
    constructor() {
        super();
        this.state = {}
        }
    

    render() {
//         axios.post('https://mysterious-basin-11324.herokuapp.com/api/registration/', data, {
//   headers: {
//     'Authorization': 'Token da51ccf5274050cd7332d184246d7d0775dc79e2',
//   }
// }
        return (
            <div className='main_container'>
            <Form horizontal>
  <FormGroup controlId="formHorizontalEmail">
    <Col componentClass={ControlLabel} sm={2}>
      Email
    </Col>
    <Col sm={10}>
      <FormControl type="email" placeholder="Email" />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalPassword">
    <Col componentClass={ControlLabel} sm={2}>
      Password
    </Col>
    <Col sm={10}>
      <FormControl type="password" placeholder="Password" />
    </Col>
  </FormGroup>

  <FormGroup>
    <Col smOffset={2} sm={10}>
      <Checkbox>Remember me</Checkbox>
    </Col>
  </FormGroup>

  <FormGroup>
    <Col smOffset={2} sm={10}>
      <Button type="submit">Sign in</Button>
    </Col>
  </FormGroup>
</Form>
                <Switch>
                    {/* <Route path='/' exact component={LogIn} /> */}
                    {/* <Route path='/note/:id' exact component={NoteView} />
                    <Route path='/create' exact component={CreateNote} />
                    <Route path='/edit/:id' exact component={EditNote} /> */}
                </Switch>
            </div>
        );
    }
}


export default Login;

// curl -X POST -H "Content-Type: application/json" -d '{"username":"testuser", "password1":"testpassword", "password2":"testpassword"}' localhost:8000/api/registration/
// Response:
// {"key":"6b7b9d0f33bd76e75b0a52433f268d3037e42e66"}

// data = {"username":"testuser2", "password1":"testpassword",
// "password2":"testpassword"}

   axios.post('https://mysterious-basin-11324.herokuapp.com/api/registration/', {"username":"testuser4", "password1":"testpassword",
   "password2":"testpassword"})
     .then(response => {
          console.log(response)
          console.log(response.data)
          console.log(response.data.key)
          this.setState({key:response.data.key})
          console.log(this.state) 
       })
        .catch(err => {
          console.error(err);
        });

    //    const creds = {username: "testuser2", password1:"testpassword"}

    //     axios.post('https:mysterious-basin-11324.herokuapp.com/api/login/', {"username":"testuser2", "password1":"testpassword"} )
    //     .then(response => {
    //         console.log(response.data)
    //         //this.props.setToken(response)
    //         this.setState(response.data)
    //     })
    //     .catch(error => console.log(`Login: ${error}`))

    //   axios.post('https://mysterious-basin-11324.herokuapp.com/api/registration/', { creds })
    //   .then(response => {
    //       console.log(response.data)
    //       this.props.setToken(response)
    //   })
    //   .catch(error => console.log(`Login: ${error}`))

    //   axios({
    //     method: 'post',
    //     url: 'https://lam-mud.herokuapp.com/api/login/',
    //     data: { creds },
    //     header: {'Content-Type': 'application/json'},
    // })
    //     .then(response => {
    //         console.log(response.data)
    //         this.props.setToken(response)
    //     })
    //     .catch(error => console.log(`Login: ${error}`))

  




// //    headers: {
// //      'Authorization': 'Token da51ccf5274050cd7332d184246d7d0775dc79e2',
// //    }
//  })