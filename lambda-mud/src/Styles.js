import Styled from 'styled-components'

export const GameBox = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
    height: auto;
    border-radius: 10px;
    background: #FECD65;
    @media(max-width: 400px) {
        width: 90%
    }
`;

export const Container = Styled.div`
    display: flex;
    justify-content: ${props => props.game ? 'space-around' : 'center'};
    margin: 20px;
    @media(max-width: 400px){
        flex-direction: column-reverse;
        justify-content: center
    }
`;


export const Banner = Styled.div`
    display: flex;
    justify-content: space-between;
    background: #29567E
    width: 100%;
    height: 50px;
    border-radius: 10px 10px 0 0;
    
`;

export const Title = Styled.h3`
    color: white;
    margin: 10px;
    font-family: 'Questrial', sans-serif;
    font-weight:
`;

export const Text = Styled.div`
    padding: 10px;
    font-family: 'Questrial', sans-serif;
`;

export const CommandPrompt = Styled.input`
    width: 100%;
`;

export const FormContainer = Styled.form`
    display: flex;
    justify-content: space-between;
    flex-direction: ${props => props.register ? 'column' : 'row'}
    margin: 10px;;
`;

export const Button = Styled.button`
    width: 100px;
    height: 30px;
    align-self: center;
    margin: 10px;
    background: #88A75D
`;