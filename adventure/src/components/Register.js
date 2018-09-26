import React from 'react';
import axios from 'axios';
import { Button, Label, Input, Form, FormGroup, CardText, Card } from 'reactstrap';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: ""
    };
  };

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  submitHandler = e => {
    e.preventDefault();
    if (this.state.username === '' || this.state.password1 === '' || this.state.password2 === '') {
      alert('Please enter credentials!');
      return;
    }
    const user = { 
      username: this.state.username, 
      password1: this.state.password1, 
      password2: this.state.password2 
    };

    axios
      .post('https://adventure-.herokuapp.com/api/registration', user)
      .then(response => {
        const token = response.data;
        console.log(response)
        localStorage.setItem('key', token)
        alert('Success!');
      })
      .catch(error => {
        console.log(error.response)
      });
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <h2>Register Below</h2>
          <Label for="exampleEmail">Username</Label>
          <Input 
            type="text"
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.inputChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input 
            type="password"
            placeholder="password"
            name="password1"
            value={this.state.password1}
            onChange={this.inputChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Confirm Password</Label>
          <Input 
            type="password"
            placeholder="confirm password"
            name="password2"
            value={this.state.password2}
            onChange={this.inputChangeHandler}
          />
        </FormGroup>
        <Card>
          <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
          </CardText>
        </Card>
            <Label check>
                <Input type="checkbox" />
                Accept the ToS!
              </Label>
            <br />
            <Button color="primary" onClick={this.submitHandler}>Register</Button>

      </Form>
    )
  }
}

export default Register;