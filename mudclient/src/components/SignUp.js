import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password1: '',
      password2: '',
      error: '',
      modal: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // the signup endpoint wants a user object {"username", "password1", "password2"}
    const { username, password1, password2 } = this.state;
    const USER = { username, password1, password2 };
    axios
      .post('https://muddy-waters.herokuapp.com/api/registration/', USER)
      .then(res => {
        // we're sent a JWT token
        const token = res.data.key;
        // stash it for later use
        localStorage.setItem('jwt', token);
        this.setState({ username: '', password1: '', password2: '' });
        this.props.history.push('/main');
      })
      .catch(err => {
        this.setState({ error: err.response.data.error });
        this.toggle();
      });
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        style={{ width: '400px', marginLeft: '35%' }}
      >
        <h1>Sign up for the best online adventure ever!</h1>
        <br />
        <FormGroup>
          <Label for="Username">Username</Label>
          <Input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleInput}
            placeholder="username"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password1">Password</Label>
          <Input
            type="password"
            name="password1"
            value={this.state.password1}
            onChange={this.handleInput}
            placeholder="password"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password2">Confirm Password</Label>
          <Input
            type="password"
            name="password2"
            value={this.state.password2}
            onChange={this.handleInput}
            placeholder="confirm password"
          />
        </FormGroup>
        <Button>Submit</Button>
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>ERROR</ModalHeader>
            <ModalBody>{this.state.error}</ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </Form>
    );
  }
}

export default SignUp;
