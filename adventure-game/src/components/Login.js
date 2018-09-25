import React from "react";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      register: false
    };
  }
  componentDidMount() {}

  toggleRegister = event => {
    event.preventDefault();
    this.setState({ register: !this.state.register });
  };

  render() {
    return (
      <div>
        {this.state.register ? (
          <form>
            <h1>Create Account</h1>
            <input placeholder="Create Account" />
            <input placeholder="Password" />
            <input placeholder="Password Again" />
            <button>Connect</button>
          </form>
        ) : (
          <form>
            <h1>Login Here</h1>
            <input placeholder="Login" />
            <input placeholder="Password" />
            <button>Connect</button>
            <p>
              No Account yet? <span onClick={this.toggleRegister}>Register here.</span>
            </p>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
