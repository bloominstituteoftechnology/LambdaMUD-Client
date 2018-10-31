import styled, { css } from 'styled-components';

export const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  background: #0f2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #0f2027, #203a43, #2c5364); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
  h1 {
    font-size: 5.5rem;
    color: #D89922;
    text-shadow: 1px 1px 10px rgba(77, 77, 255, .6);
  }

  h2 {
    font-size: 4.3rem;
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
  }

  ${props => props.home && css`
    main {
      min-height: calc(100vh - 250px);
      max-width: 1400px;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;

      @media (max-width: 1000px) {
        flex-direction: column;
      }
    }
  `}
   
  ${props => props.rooms && css`
    
  `}
`;
