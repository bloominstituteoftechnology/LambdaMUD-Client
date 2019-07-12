import React from "react";
import Register from "./Register";
import Button from "@material-ui/core/Button";
import { Container, Typography } from "@material-ui/core";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      register: false
    };
  }

  registerChange = () => {
    this.setState(prev => {
      return { register: !prev.register };
    });
  };

  render() {
    return (
      <Container>
        {this.state.register ? (
          <Register registerChange={this.registerChange} />
        ) : (
          <div>
            <Typography color="secondary">Blah, blah, blah login details</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.registerChange}
            >
              Register
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default Login;
