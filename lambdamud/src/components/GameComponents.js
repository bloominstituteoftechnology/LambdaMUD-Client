import styled from 'styled-components';

export const GameForm=styled.form`
    max-width:600px;
    width:100%;
    height:auto;
    
`
export const GameFormHeader=styled.div`
    background-color:#003399;
    height:40px;
    color:#FFF;
    font-size:16px;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    padding-left:30px;
    border-radius:3px;
`
export const GameFormMain=styled.div`
    background-color:#FFF;
    height:300px;
    width:596px;
    border:2px solid #003399;
    border-radius:3px;
`
export const GameFormControls=styled.div`
    background-color:#d3d3d3;
    height:50px;
    display:flex;
    justify-content: space-evenly;
    align-items:center;
    input {
        width:65%;
        height:20px;
        border-radius:3px;
        outline:none;
        border-color:transparent;
    }
`
export const GameFormTextSection=styled.div`
    height:250px;
    div{
        text-align:left;
        font-size:14px;
        padding-left:10px;
    }
`
export const ActionButton=styled.button`
    background-color:#ffbb33;
    color:#FFF;
    font-size:14px;
    outline:none;
    border-color:transparent;
    width:70px;
    height:25px;
`
export const LogOutButton=styled.button`
    background-color:#cc443d;
    color:#FFF;
    font-size:14px;
    outline:none;
    border-color:transparent;
    width:70px;
    height:25px;
`

