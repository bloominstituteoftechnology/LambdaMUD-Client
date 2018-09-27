import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
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
    // the login endpoint wants a user object {username, password}
    axios
      .post('https://muddy-waters.herokuapp.com/api/login/', this.state)
      .then(res => {
        // we're sent a JWT token
        const token = res.data.key;
        // stash it for later use
        localStorage.setItem('jwt', token);
        this.props.history.push('/main');
      })
      .catch(err => {
        this.setState({ error: err.response.data.error });
        this.toggle();
      });
    this.setState({ username: '', password: '' });
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form onSubmit={this.handleSubmit} style={{ width: '400px' }}>
          <h1>Login for the most amazing adventure!!</h1>
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
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInput}
              placeholder="password"
            />
          </FormGroup>
          <Button>Submit</Button>
          <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>ERROR</ModalHeader>
              <ModalBody>{this.state.error}</ModalBody>
              <ModalFooter>
                <Button autoFocus color="secondary" onClick={this.toggle}>
                  {'<ESC>'}
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </Form>
      </div>
    );
  }
}

export default Login;
