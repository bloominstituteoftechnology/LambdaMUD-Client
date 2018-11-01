import styled from 'styled-components'
import img from '../../images/Frame.svg'

export const HomeContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #000;
    background-position: bottom -0px center;
    background-size: 2000px auto;
    background-repeat: no-repeat;
    background-image: url(${img});
`


export const FormContainer = styled.div`
        background-color:white;
        height: 80vh;
        width: 80vw;
        border-radius: 8px;
        background: #020202;
        margin: 0 auto;
        color: #fff;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 0;
        border: 1px solid #000;
`
