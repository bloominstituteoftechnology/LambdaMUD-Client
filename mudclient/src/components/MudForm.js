import React, { Component } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';

class MudForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: '',
    };
  }

  doCommand = event => {
    event.preventDefault();
    const DIRECTIONS = ['n', 'e', 'w', 's'];
    let { command } = this.state;
    if (
      command === 'north' ||
      command === 'south' ||
      command === 'east' ||
      command === 'west'
    ) {
      command = command[0];
    }
    if (DIRECTIONS.includes(command)) {
      this.props.moveCharacter(command);
    }

    this.setState({
      command: '',
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="MudForm">
        <Form
          inline
          onSubmit={this.doCommand}
          style={{ justifyContent: 'center' }}
        >
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
