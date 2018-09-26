import React from "react";
import styled from "styled-components";
import "../../custom-props.css";
import gate from "./assets/gate.png";
import { Link } from 'react-router-dom';
const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  max-width: 800px;
  color: var(--white);
`;
const GateContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

`;
const Gate = styled.img.attrs({
  src: gate,
  alt: "gate"
})`
  max-width: 130%;
  height: auto;
  pointer-events: none;
`;

const TitleSign = styled.div`
  position: absolute;
  top: 20%;
  left: 53%;
  transform: translateX(-50%);
  background: var(--brown);
  width: 50%;
  height: 15%;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;
const Enter = styled.div`
  position: absolute;
  top: 35%;
  width: 50%;
  height: 50%;
  background: var(--gold);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 0 10px 15px;
  font-weight: 3rem;
  &:hover {
      background: red;
  }
`;
const HomeComponent = props => {
  return (
    <HomeWrapper>
      <GateContainer>
        <Gate />
        <TitleSign>DunderScape</TitleSign>
        <Enter
          onClick={() => {
            props.history.push("/login-or-registration");
          }}
        >
          Enter
        </Enter>
      </GateContainer>
    </HomeWrapper>
  );
};

export default HomeComponent;
