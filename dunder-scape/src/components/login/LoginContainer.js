import React, { Component } from "react";
import styled from "styled-components";
import axios from 'axios';
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

import trees from "./assets/multi-tree.svg";
import ConnectButton from "../common/ConnectButton";
const LoginWrapper = styled.div`
  overflow: hidden;
`;
const MultiTree = styled.img.attrs({
  src: trees,
  alt: "",
})`
  max-width: 75%;
  height: auto;
  pointer-events: none;
  position: absolute;
  left: -14%;
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

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  componentDidMount() {
    this.setState({
      username: "",
      password: "",
    })
  }
  loginHandler() {
    const requestBody = {
      username: this.state.username,
      password: this.state.password,
    }
    axios.post('https://dunder-scape.herokuapp.com/api/login', requestBody)
    .then(res => {
      localStorage.setItem('mudToken', res.data.key);
      console.log(localStorage.getItem('mudToken'))
      this.props.history.push('/game')
    })
    .catch(err => {
      console.log('POST error for login');
    })
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <LoginWrapper>
        <MultiTree />
        <StyledForm horizontal>
        <Col sm={5} xsOffset={6}>
        <Title>Login</Title>
        </Col>
          <FormGroup controlId="formHorizontal">
            <Col sm={5} xsOffset={6} className = 'margin-lg'>
            <Label bsStyle="default">Username</Label>{' '}
              <FormControl bsSize= "large" type="text" placeholder="Add Username" onChange = {this.changeHandler} name = 'username'/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword1">
            <Col sm={5} xsOffset={6} className = 'margin-sm'>
              <Label bsStyle="default">Password</Label>{' '}
              <FormControl bsSize= "large" type="password" placeholder="Password" onChange = {this.changeHandler} name = 'password'/>
            </Col>
          </FormGroup>
          <ConnectButton className = 'form-btn margin-lg' type="submit" onClick = {() => {
              this.loginHandler();
            }}>Re-Connect</ConnectButton>
        </StyledForm>
      </LoginWrapper>
    );
  }
}

export default LoginContainer;
