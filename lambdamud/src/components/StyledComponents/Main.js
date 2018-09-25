import styled from 'styled-components';

export const MainContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const MainChatContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const MainChat = styled.div`
    margin: 15px 53px 0px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end
    height: 100%;
    font-size: 25px;
    overflow: hidden;
`

export const BottomContainer = styled.div`
    display: flex;
    border-top: 1px solid grey;
    background: #F5F5F5;
    align-items: center;
    height: 30%;
`

export const MainForm = styled.form`
    display: flex;
    width: 100%;
    padding: 0 53px;
`

export const MainInput = styled.input`
    width: 100%;
    padding: 5px;
    font-size: 25px;
`

export const MainButton = styled.div`
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: #E7AE61;
    color: white;
`

export const Loading = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
`

export const MainError = styled.p`
    color: red;
    font-weight: bold;
`

export const MainPlayer = styled.p`
    color: ${props => props.orange ? 'orange' : 'green'};
`

