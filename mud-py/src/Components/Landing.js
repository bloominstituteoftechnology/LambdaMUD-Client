import React, { Component } from "react";
import pyman_logo from "../assets/pyman_logo@2x.png";
import styled from "styled-components";
import "./landing.css";

const LandingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding-top: 100px;
  max-width: 100%;
`;

export default class Landing extends Component {
  render() {
    return (
      <div className="game">
        <div className="pacman">
          <div className="pacman-top" />
          <div className="pacman-bottom" />
        </div>
        <div className="dots-list">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>
    );
  }
}
