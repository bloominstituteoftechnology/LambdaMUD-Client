import styled, { css } from 'styled-components';

export const Section = styled.section`
  width: 42.8%;
  margin: 2.8%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1000px) {
    width: 90%;
  }

  ${props => props.log && css`
    @media (max-width: 1000px) {
      margin: 150px 0;
    }
  `}
`;

export const Form = styled.form`
  margin-top: 30px;
  width: 70%;

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    label {
      margin-bottom: 5px;
    }

    input {
      padding: 15px;
      border: .5px solid rgba(77, 77, 255, .5);
      border-radius: 10px;
      font-size: 1.7rem;
    }
  }
`;
