import React from "react";
import axios from "axios";
import styled from "styled-components";

const StyledInputs = styled.input`
display: inline
width: auto;
  padding: 1% 1%;
  font-size: 0.9rem;
  font-weight: bold;
`;

const StyledH2 = styled.h2`
  display: inline;
  margin: 0 2%;
`;

const StyledLoginContainerDiv = styled.div`
  diplay: inline;
  width: 70%;
`;

const StyledButton = styled.button`
  width: 13%;
  padding: 1% 1%;
  font-size: 0.9rem;
  font-weight: bold;
  margin-left: 2%;
`;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regusername: "",
      regpassword: ""
    };
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  regsubmit = () => {
    const newUser = {
      username: this.state.regusername,
      password1: this.state.regpassword,
      password2: this.state.regpassword
    };

    this.setState({ regpassword: "", regusername: "" });
    axios
      .post(`https://tomprojectweekmudserver.herokuapp.com/api/registration/`, newUser)
      .then(user => {
        console.log(user);
        localStorage.setItem("token", user.data.key);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <StyledLoginContainerDiv>
        <StyledH2>Username</StyledH2>
        <StyledInputs
          type="text"
          placeholder="Pick your username"
          name="regusername"
          onChange={this.handleInput}
          value={this.state.regusername}
        />
        <StyledH2>Password</StyledH2>
        <StyledInputs
          type="password"
          placeholder="Pick your password"
          name="regpassword"
          onChange={this.handleInput}
          value={this.state.regpassword}
        />
        <StyledButton onClick={this.regsubmit}>Register</StyledButton>
      </StyledLoginContainerDiv>
    );
  }
}

export default Register;
