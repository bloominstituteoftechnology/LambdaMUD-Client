import React from "react";

class InputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      command: ''
    }
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler = (e) => {
    e.preventDefault();
    let parts = this.state.command.split(' ');
    let comm = parts.shift();
    let content = parts.join(' ');
    this.props.callApi(comm, content);
    this.setState({ command: '' });
  }

  render() {
    return (
      <div className='inputs'>
        <form onSubmit={this.submitHandler}>
          <input name='command' type='text' onChange={this.changeHandler} placeholder="Enter a command" value={this.state.command} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default InputComponent;
