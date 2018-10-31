import React from 'react';
import styled from 'styled-components'

const MainHeader = styled.header`
  width: 100%;
  max-width: 1400px;
  height: 200px;
  padding: 20px;
  margin: auto;
  text-align: center;

  h1 {
    margin-top: 30px;
  }

`;


function Header(props) {
  return (
    <MainHeader>
      <h1>{props.title}</h1>
    </MainHeader>
  )
}

export default Header;