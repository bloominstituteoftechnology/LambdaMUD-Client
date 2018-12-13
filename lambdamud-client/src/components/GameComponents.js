import styled from "styled-components";

export const GameForm = styled.form`
  max-width: 600px;
  width: 100%;
  height: auto;
  margin: auto;
`;
export const GameFormHeader = styled.div`
  background-color: #003399;
  height: 40px;
  color: #fffffa;
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 30px;
  border-radius: 3px;
`;
export const GameFormMain = styled.div`
  background-color: #fffffa;
  height: 301px;
  max-width: 596px;
  width: 99%;
  border: 2px solid #003399;
  border-radius: 3px;
`;
export const GameFormControls = styled.div`
  background-color: #d3d3d3;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  input {
    width: 50%;
    height: 20px;
    font-size: 16px;
    border-radius: 3px;
    outline: none;
    border-color: transparent;
    color: #313639;
  }
`;
export const GameFormTextSection = styled.div`
  height: 250px;
  overflow: scroll;
  div {
    margin-top: 10px;
    text-align: left;
    font-size: 14px;
    padding-left: 10px;
    padding-right: 10px;
    p {
      padding-bottom: 5px;
      letter-spacing: 1px;
      color: #313639;
    }
    .green {
      color: #50c85a;
    }
  }
  .action {
    width: 96%;
    border-bottom: 1px solid #d3d3d3;
  }
`;
export const ActionButton = styled.button`
  background-color: #ffbb33;
  color: #fffffa;
  font-size: 14px;
  outline: none;
  border-color: transparent;
  width: 70px;
  height: 25px;
`;
export const LogOutButton = styled.button`
  background-color: #cc443d;
  color: #fffffa;
  font-size: 14px;
  outline: none;
  border-color: transparent;
  width: 70px;
  height: 25px;
`;
