import styled from "styled-components";


const Form = styled.form`
  background-color: #f7fadd;
  margin: 0 auto;
  width: 50%;
  borderRadius: 5px;
  box-shadow: 2 4px 8px 2 rgba(0, 0, 0, 0.6);
  transition: 1.6s;
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
    border: 1px solid pink;
    borderradius: 2px;
    &:focus {
      outline: 0;
      border-color: pink;
    }
  }
  button {
    width: 30%;
    margin: 1rem auto;
    padding: 0.5rem;
    font-size: 1rem;
    background-color: transparent;
    border: 1px solid blue;
  }
`;

export default Form;
