import React from "react";
import styled from "styled-components";
import "../../custom-props.css";
import gate from "./assets/gate.png";
const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  bottom: 10%;
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
  pointer-events: none;
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
  top: 44%;
  left: 27%;
  width: 50%;
  height: 50%;
  z-index: -1;
  background: var(--gold);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 0 40px 15px;
  font-size: 4rem;
  pointer-events: auto;
  cursor: pointer;
  &:hover {
    background: darkred;
    -webkit-box-shadow: 10px 10px 97px 0px rgba(143, 0, 0, 1);
    -moz-box-shadow: 10px 10px 97px 0px rgba(143, 0, 0, 1);
    box-shadow: 10px 10px 97px 0px rgba(143, 0, 0, 1);
  }
  -webkit-box-shadow: 10px 10px 97px 0px rgba(222, 180, 0, 1);
  -moz-box-shadow: 10px 10px 97px 0px rgba(222, 180, 0, 1);
  box-shadow: 10px 10px 97px 0px rgba(222, 180, 0, 1);
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
