import styled from 'styled-components';

const AuthForm=styled.form`
    max-width:400px;
    width:100%;
    background-color:#ddd;
    border:1px solid #555555;
    
    h2{
        margin-top:20px;
        color:#080606;
    }
    input{
        margin-top:15px;
        font-size:16px;
        width:80%;
        height:25px;
        display:block;
        outline:none;
        border-radius:3px;
        border-color:transparent;
    }
    button{
        height:30px;
        width:40%;
        display:inline-block;
        color:#fff;
        font-size:13px;
        margin-top:10px;
        background-color:#3db0e3;
        margin-bottom:20px;
        outline:none;
    }
    button[type='submit']{
        margin-right:1%;
    }
    button[type='button']{
        margin-left:1%;
    }
`
export {AuthForm}