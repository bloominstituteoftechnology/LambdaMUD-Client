import React, { Component } from "react";
import styled from "styled-components";
import {
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Checkbox,
  Button,
  Label
} from "react-bootstrap";

import tree from "./assets/big-tree.svg";
import ConnectButton from "../common/ConnectButton";
const RegisterWrapper = styled.div`
  overflow: hidden;
`;
const BigTree = styled.img.attrs({
  src: tree,
  alt: "",
})`
  max-width: 75%;
  height: auto;
  pointer-events: none;
  position: absolute;
  left: -35%;
  bottom: 0;
  fill: var(--brown);
`;
const Title = styled.h2`
  font-size: 5rem;
`;
const StyledForm = styled(Form)`
  margin: 50px 0 0 0;
  .margin-lg {
    margin-top: 40px;
  }
  .margin-sm {
    margin-top: 20px;
  }
  .form-btn {
    position: relative;
    left: 71.5%;
  }
`;

class RegisterContainer extends Component {
  state = {
    username: "",
    password1: "",
    password2: ""
  };
  componentDidMount() {
    this.setState({
      username: "",
      password1: "",
      password2: ""
    })
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <RegisterWrapper>
        <BigTree />
        <StyledForm horizontal>
        <Col sm={5} xsOffset={6}>
        <Title>Create Account</Title>
        </Col>
          <FormGroup controlId="formHorizontal">
            <Col sm={5} xsOffset={6} className = 'margin-lg'>
            <Label bsStyle="default">Username</Label>{' '}
              <FormControl bsSize= "large" type="text" placeholder="Add Username" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col sm={5} xsOffset={6} className = 'margin-sm'>
              <Label bsStyle="default">Password</Label>{' '}
              <FormControl bsSize= "large" type="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col sm={5} xsOffset={6} className = 'margin-sm'>
              <Label bsStyle="default">Re-enter Password</Label>{' '}
              <FormControl bsSize= "large" type="password" placeholder="Enter Password Again" />
            </Col>
          </FormGroup>
          <ConnectButton className = 'form-btn margin-lg' type="submit">Connect</ConnectButton>
        </StyledForm>
      </RegisterWrapper>
    );
  }
}

export default RegisterContainer;
