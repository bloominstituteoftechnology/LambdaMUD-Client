import React from 'react';
import Modal from './Modal/Modal';
import { MainHeaderContainer, MainHeader } from './StyledComponents/Header';
import { MainContainer, MainChat, BottomContainer, MainForm, MainInput, MainButton } from './StyledComponents/Main';

class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            modal: false
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {

        } else {
            this.setState({ modal: true });
        }
    }

    render() {
        return (
            <MainContainer>

                <Modal modal={this.state.modal} history={this.props.history} />

                <MainHeaderContainer>
                    <MainHeader>Main Screen</MainHeader>
                </MainHeaderContainer>

                <MainChat>
                    Outside
                </MainChat>

                <BottomContainer>
                    <MainForm>
                        <MainInput />
                        <MainButton>Send</MainButton>
                    </MainForm>
                </BottomContainer>


            </MainContainer>
        );
    }
}

export default Main;