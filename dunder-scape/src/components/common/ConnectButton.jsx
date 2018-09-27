import styled from 'styled-components';
const ConnectButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    padding: 20px;
    background: var(--purple);
    color: var(--white);
    border-radius: 4px;
    font-size: 3rem;
    cursor: pointer;
    &:after {
        content: "";
        display: block;
        padding-bottom: 20%;
    }
   
`;
export default ConnectButton;