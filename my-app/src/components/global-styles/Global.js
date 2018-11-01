import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => (props.col3 ? "1fr 1fr 1fr" : "1fr")};
`;

export const Input = styled.input`
  background-color: #f9f9f9;
  height: 2.5em;
  font-size: 20px;
  margin: 10px;
  width: 190px;
  border: none;
  padding-left: 10px;
  color: #555;
  border: 1px solid #eee;
  font-weight: 300;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &:focus {
    background-color: white;
    outline: none;
    color: #555;
    border: 1px solid #b900b382;
  }
`;
export const Button = styled.button`
  border: none;
  color: #fff;
  height: 40px;
  outline: none;
  width: 200px;
  margin: 10px;
  cursor: pointer;
  font-weight: 600;
  background-image: linear-gradient(-135deg, #1400c884, #b900b382, #f5000076);
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  transition: 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)
`;
