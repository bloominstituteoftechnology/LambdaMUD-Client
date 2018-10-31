import styled, { css } from 'styled-components';

export const Section = styled.section`
  width: 29.9%;
  border: solid 1px red;
  padding: 20px;

  div {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      width: 30%;
      margin: 15px 5%;
    }
  }

  ${props => props.description && css`
    width: 40%;
  `}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
  }

  input {
    width: 90%;
    padding: 10px;
    border: .5px solid rgba(77, 77, 255, .5);
    border-radius: 10px;
    font-size: 1.7rem;
  }
`;

