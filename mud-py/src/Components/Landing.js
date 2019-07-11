import React, { Component } from "react";
import pyman_logo from "../assets/pyman_logo@2x.png";
import styled from "styled-components";

const LandingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding-top: 100px;
  max-width: 100%;
  /* height: 1vh; */
`;

export default class Landing extends Component {
  render() {
    return (
      <LandingContainer>
        <img src={pyman_logo} alt="PY-MAN logo" height="auto" width="75%" />
      </LandingContainer>
    );
  }
}
