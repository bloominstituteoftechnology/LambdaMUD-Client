import styled from "styled-components";
import img from "../../images/Frame.svg";

export const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #000;
  background-position: bottom -0px center;
  background-size: 2040px auto;
  background-repeat: no-repeat;
  background-image: url(${img});
`;

export const TerminalContainer = styled.div`
  background-color: white;
  height: 80vh;
  width: 80vw;
  border-radius: 8px;
  background: #020202;
  margin: 0 auto;
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0;
  border: 1px solid #000;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => (props.col3 ? "1fr 1fr 1fr" : "1fr")};
  align-items: center;
  justify-items: center;
  @media (max-width: 820px) {
    grid-template-columns: ${props => (props.col3 ? "1fr" : "1fr")};
  }
`;

export const CenterForm = styled.div`
  display: grid;
  align-self: center;
  justify-self: center;
  height: 50vh;
`


export const Input = styled.input`
  background-color: #090909;
  height: 2.5em;
  font-size: 20px;
  margin: 10px;
  width: 200px;
  border: none;
  padding-left: 10px;
  color: white;
  border: 1px solid #444;
  font-weight: 300;
  font-size: 14px;
  font-family: monospace, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &:focus {
    background-color: black;
    outline: none;
    color: white;
    border: 1px solid #c23aba;
  }
`;
export const Line = styled.div`
  height: 1px;
  background: #444;
  width: 100%;
`;
export const Button = styled.button`
  border: none;
  color: #fff;
  height: 40px;
  outline: none;
  width: 215px;
  cursor: pointer;
  font-weight: 600;
  background: black;
  border: ${props =>
    props.nav ? "0 1px 0 1px solid #444" : "1px solid #C23ABA"};
  font-size: 14px;
  font-family: monospace, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  transition: 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
`;
