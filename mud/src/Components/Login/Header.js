import React from 'react';
import styled from 'styled-components'

const StyledHeaderDiv = styled.div`
width: 100%;
text-align: center;
`;


function LambdaHeader () {
   
    return (
        <StyledHeaderDiv>
        <h1>Welcome to Lambda Adventure</h1>
        </StyledHeaderDiv>
    )
    
}

export default LambdaHeader;