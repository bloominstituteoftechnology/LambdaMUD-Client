import styled from 'styled-components';

export const ModalWrapper = styled.div`
    display: none; 
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%;
    height: 100%; 
    overflow: auto;
    background: rgba(211, 210, 211, .9);
`

export const ModalContent = styled.div`
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 532.83px;
    margin-top: 169px;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.6rem;
    padding-top: 44px;
    p {
        margin-top: 0;
    }
`

export const ModalButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    height: 42px;
`

export const ModalLogin = styled.button`
    display: flex;
    align-self: center;
    justify-content: center;
    width: 190px;
    margin-right: 21px;
    margin-left: 50px;
    background: #2481BC;
    color: #FFFFFF;
    border: #979797;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 10px;
`

export const ModalRegister = styled.button`
    display: flex;
    align-self: center;
    justify-content: center;
    width: 190px;
    border: #979797;
    color: #FFFFFF;
    background: #41A622;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 10px;
`