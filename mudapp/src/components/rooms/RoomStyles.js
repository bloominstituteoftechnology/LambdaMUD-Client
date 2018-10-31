import styled, { css } from 'styled-components';

export const Section = styled.section`
  width: 29.9%;
  border: solid 1px red;
  padding: 20px;
  
  
  ${props => props.chat && css`
    div:not(:first-child) {
      margin-top: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      
      button {
        width: 80%;
        padding: 10px 5%;
      }
    }
  `}
  
  ${props => props.description && css`
    text-align: center;
    width: 40%;
  `}
  
  ${props => props.buttons && css`
    div {
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        width: 30%;
        margin: 15px 5%;
      }
    }
  `}
  `;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  label {
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: .5px solid rgba(77, 77, 255, .5);
    border-radius: 10px;
    font-size: 1.7rem;
  }
`;

