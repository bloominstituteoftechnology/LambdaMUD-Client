import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => (props.col3 ? "1fr 1fr 1fr" : null)};
`;

export const Input = styled.input`
  background-color: #f9f9f9;
  height: 2.5em;
  font-size: 20px;
  padding-left: 10px;
  margin: 10px;
  width: 200px;
  border: none;
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
  margin-top: 10px;
  width: auto;
  cursor: pointer;
  font-weight: 600;
  background-image: linear-gradient(-135deg, #1400c884, #b900b382, #f5000076);
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  transition: 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  &:hover {
    transform: translateY(-3px);
  }
`;
