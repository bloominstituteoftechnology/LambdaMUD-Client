import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => (props.col3 ? "1fr 1fr 1fr" : "1fr")};
  align-items: center;
  justify-items: center;
`;

export const Input = styled.input`
  background-color: #090909;
  height: 2.5em;
  font-size: 20px;
  margin: 10px;
  width: 200px;
  border: none;
  padding-left: 10px;
  color: white;
  border: 1px solid #333;
  font-weight: 300;
  font-size: 14px;
  font-family: monospace,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &:focus {
    background-color: black;
    outline: none;
    color: white;
    border: 1px solid #af00ff;
  }
`;
export const Button = styled.button`
  border: none;
  color: #fff;
  height: 40px;
  outline: none;
  width: 220px;
  cursor: pointer;
  font-weight: 600;
  background: black;
  border: 1px solid #af5fff;
  font-size: 14px;
  font-family: monospace, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  transition: 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)
`;
