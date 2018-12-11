import styled from 'styled-components';

const StyledNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #aa42f4;
  margin-bottom: 2rem;
  height: 6rem;
  a {
    padding: 1rem;
    font-size: 2rem;
    color: white;
    &:focus {
      outline: none;
    }
  }
  button {
    background-color: inherit;
    color: white;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    font-family: inherit;
    padding: 1rem;
    &:focus {
      outline: none;
    }
  }
`;

export default StyledNav;