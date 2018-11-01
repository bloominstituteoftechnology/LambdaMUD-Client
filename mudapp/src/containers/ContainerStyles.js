import styled, { css } from 'styled-components';

export const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  background: #0f2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #0f2027, #203a43, #2c5364); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
  h1 {
    font-size: 6rem;
    color: #D89922;
    text-shadow: 1px 1px 10px rgba(77, 77, 255, .6);
  }
  
  h2 {
    font-size: 4.8rem;
    color: #D89922;
  }
  
  h3 {
    font-size: 3rem;
    color: #D89922;
  }
  
  p, label {
    font-size: 2rem;
    color: #D89922;
  }


  button {
    width: 45%;
    font-size: 1.6rem;
    padding: 10px;
    background-color: #D89922;
    border: .5px solid rgba(77, 77, 255, .5);
    &:hover {
      cursor: pointer;
    }
  }

  ${props => props.rooms && css`
    display: flex;
  `}
`;

export const HomeHeader = styled.header`
  width: 100%;
  max-width: 1400px;
  height: 230px;
  padding: 20px;
  margin: auto;
  text-align: center;

  h1 {
    margin-top: 30px;
  }
`;

export const HomeBody = styled.main`
  min-height: calc(100vh - 230px);
  max-width: 1400px;
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
