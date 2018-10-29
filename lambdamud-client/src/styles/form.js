import styled from 'styled-components';

const Form = styled.form`
  margin: 0 auto;
  width: 50%;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  input,
  textarea,
  select {
    width: 60%;
    margin: 0.5rem auto;
    padding: 0.5rem;
    font-size: 1.5rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: black;
    }
  }
  button {
    width: 30%;
    margin: 1rem auto;
    padding: 0.5rem;
    font-size: 1rem;
    background-color: transparent;
    border: 1px solid black;
  }
`;

export default Form;
