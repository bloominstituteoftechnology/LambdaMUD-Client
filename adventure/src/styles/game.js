import styled from "styled-components";

const StyledGame = styled.div`
  margin: 0 auto;
  width: 60%;
  height: 60rem;
  border: 2px solid grey;
  border-radius: 3px;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
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
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  outline-color: grey;
`;

export default StyledGame;
export { StyledInput };

