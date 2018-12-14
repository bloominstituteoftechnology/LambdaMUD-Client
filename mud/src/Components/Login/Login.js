import React from "react";
import axios from "axios";
import Register from "./Register";
import LoginDiv from "./LoginDiv";
import styled from "styled-components";
import LambdaHeader from "./Header";

const StyledButton = styled.button`
width: 18%;
height: 10%;
padding: .7% 1%;
font-size: 0.9rem;
font-weight: bold;
margin-left: 2%;
`;

const StyledContainerDiv = styled.div`
 margin:0 auto 
 display: flex;
 justify-content: center;
 height: 100%;
 width: 100%;
 flex-wrap: wrap;
`;

const StyledFieldsDiv = styled.div`
height:100%; 
width: 85%
padding:10px;
display: flex;
justify-content: center;
align-items: center;

`;


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: false
    };
  }
  toggle = () => {
    this.setState({ registered: !this.state.registered });
  };
  render() {
    let registeredOrNot = this.state.registered;
    let loginorregister;
    let buttontext = "";

    if (registeredOrNot) {
      loginorregister = <Register />;
      buttontext = "Back to login";
    }
    if (!registeredOrNot) {
      loginorregister = <LoginDiv />;
      buttontext = "Click here to Register";
    }
    let loginorregisterbutton = (
      <StyledButton onClick={this.toggle}>{buttontext}</StyledButton>
    );

    return (
      <StyledContainerDiv>
        <LambdaHeader/>
        <StyledFieldsDiv>
          {loginorregister}
          {loginorregisterbutton}
        </StyledFieldsDiv>
      </StyledContainerDiv>
    );
  }
}

export default Login;
