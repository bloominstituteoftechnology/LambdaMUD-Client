import React from "react";
import SquareButton from "../common/SquareBtn";
import styled from "styled-components";
const ChoiceWrapper = styled.div`
  &:first-child {
    margin-top: 24px;
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 5rem;
  color: var(--white);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 48px;
`;

const ChoiceComponent = props => {
  return (
    <ChoiceWrapper>
      <Title>Welcome Player</Title>
      <Title>Two choices have been put forth</Title>
      <ButtonWrapper>
        <SquareButton onClick = {() => {
            props.history.push('/registration');
          }}>
            Give Birth to a new Character <br />
            (Register)
        </SquareButton>
        <SquareButton onClick = {() => {
            props.history.push('/login');
          }}>
          Wake up your Character <br />
          (Login)
        </SquareButton>
      </ButtonWrapper>
    </ChoiceWrapper>
  );
};

export default ChoiceComponent;
