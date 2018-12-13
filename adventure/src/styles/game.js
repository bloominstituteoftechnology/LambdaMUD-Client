import styled from "styled-components";

const StyledGame = styled.div`
  margin: 0 auto;
  width: 60%;
  height: 60rem;
  border: 2px solid pink;
  border-radius: 3px;
  box-shadow: 2 4px 8px 2 rgba(0, 0, 0, 0.6);
  transition: 1.6s;
  padding: 2rem;
  overflow-y: scroll;
`;

const StyledInput = styled.input`
  display: block;
  border: none;
  padding: 0.5rem;
  margin: 0 auto;
  width: 60%;
  height: 4rem;
  font-size: 2rem;
  margin-top: 2rem;
  box-shadow: 2 4px 8px 2 rgba(0, 0, 0, 0.6);
  transition: 1.6s;
  outline-color: pink;
`;

export default StyledGame;
export { StyledInput };

