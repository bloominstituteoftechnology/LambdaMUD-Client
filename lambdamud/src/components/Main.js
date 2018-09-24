import React from 'react';
import { MainHeaderContainer, MainHeader } from './StyledComponents/Header';
import { MainContainer, MainChat, BottomContainer, MainForm, MainInput, MainButton } from './StyledComponents/Main';

class Main extends React.Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <MainContainer>

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