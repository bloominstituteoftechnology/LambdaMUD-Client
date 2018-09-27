import styled from 'styled-components';

export const LoginContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const LoginFormContainer = styled.div`
    height: 100%;
`

export const LoginForm = styled.form`
    margin: 35px 53px;
    display: flex;
    flex-direction: column;
    width: 61%;
`

export const LoginInput = styled.input`
    margin: 20px 0;
    padding: 20px 10px;
    font-size: 20px;
`

export const LoginButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px;
    margin-top: 22px;
    width: 51%;
    border-radius: 20px;
    background: white;
    border: 1px solid black;
    font-size: 20px;
    cursor: pointer;
`
