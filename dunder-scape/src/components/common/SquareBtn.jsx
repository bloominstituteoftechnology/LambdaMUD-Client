import styled from "styled-components";

const SquareButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 30%;
    background: var(--purple);
    color: var(--white);
    border-radius: 4px;
    text-align: center;
    line-height: 118%;
    font-size: 5rem;
    cursor: pointer;
    &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
   
`;

export default SquareButton;