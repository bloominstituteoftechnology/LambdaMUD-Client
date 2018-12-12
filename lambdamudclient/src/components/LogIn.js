import React from 'react';
import {MainBox, TitleBox, Title, ContentBox, InputBox, PasswordBox, Button} from './style.js';

export default class LogIn extends React.Component{
    render(){
        return(
            <MainBox>
                <TitleBox>
                    <Title>
                        Login Screen
                    </Title>
                </TitleBox>
                <ContentBox>
                    <InputBox
                        type='text'
                        placeholder='Login'
                    />
                    <PasswordBox
                        type='password'
                        placeholder='password'
                    />
                    <Button>
                        Connect
                    </Button>
                </ContentBox>
            </MainBox>
        )
    }
}