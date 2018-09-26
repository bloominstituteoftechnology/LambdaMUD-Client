import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Input } from 'reactstrap';

class MudForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: '',
    };
  }

  doCommand = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    const { command } = this.state;
    console.log(`DID ${command}`);
    // todo check if a valid command, make the appropriate API call
    // axios
    //   .post('http://localhost:4444/smurfs', newSmurf)
    //   .then(response => {
    //     this.props.handleUpdate(response.data);
    //     this.props.history.push('/');
    //   })
    //   .catch(err => console.log('ERR creating a new smurf:', err));

    this.setState({
      command: '',
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { uuid, name, title, description, players } = this.props;
    return (
      <div className="MudForm" style={{ marginLeft: '20%' }}>
        <Form inline onSubmit={this.doCommand}>
          <FormGroup>
            <input
              onChange={this.handleInputChange}
              placeholder="command"
              value={this.state.command}
              name="command"
            />
          </FormGroup>
          <Button type="submit">Send</Button>
        </Form>
      </div>
    );
  }
}

export default MudForm;
