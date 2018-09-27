import React from 'react';
import { ModalWrapper, ModalContent, ModalButtonsContainer, ModalLogin, ModalRegister } from '../StyledComponents/Modal';

const ModalContainer = props => {
    return (
        <ModalWrapper style={props.modal ? { display: 'block' } : null}>

            <ModalContent>

                <p>You need to be signed in!</p>

                <ModalButtonsContainer>
                    <ModalLogin onClick={() => props.history.push('/login')} className='delete-button'>SIGN IN</ModalLogin>
                    <ModalRegister onClick={() => props.history.push('/register')} className='cancel-button'>REGISTER</ModalRegister>
                </ModalButtonsContainer>

            </ModalContent>

        </ModalWrapper>
    );
}

export default ModalContainer;