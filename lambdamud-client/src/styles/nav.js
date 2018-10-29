import styled from 'styled-components';

const StyledNav = styled.div`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #636e72;
  margin-bottom: 2rem;
  height: 6rem;
  a {
    padding: 1rem;
    font-size: 2rem;
    color: white;
  }
  button {
    background-color: inherit;
    color: white;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    font-family: inherit;
    padding: 1rem;
  }
`;

export default StyledNav;
