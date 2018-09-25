import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FormGroup, Col, Form, ControlLabel, FormControl, Checkbox, Button } from 'react-bootstrap'

class NewAccount extends Component {
    render() {
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
</Form>;
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


export default NewAccount;