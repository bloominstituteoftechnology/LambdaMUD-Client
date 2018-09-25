import React from 'react';
import Modal from './Modal/Modal';
import axios from 'axios';
import { MainHeaderContainer, MainHeader } from './StyledComponents/Header';
import { MainContainer, MainChatContainer, MainChat, BottomContainer, MainForm, MainInput, MainButton, Loading } from './StyledComponents/Main';

class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            modal: false,
            loggedIn: false,
            info: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('https://salty-tundra-21950.herokuapp.com/api/adv/init/', { headers: { Authorization: 'Token ' + token } })
                .then(response => this.setState({ info: response.data, loggedIn: true }))
                .catch(() => this.setState({ modal: true }))

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

                <MainChatContainer>

                    {this.state.loggedIn ?
                        <React.Fragment>

                            <MainChat>
                                <div>
                                    <p>{this.state.info.title}</p>
                                    <p>{this.state.info.description}</p>
                                </div>
                            </MainChat>

                            <BottomContainer>
                                <MainForm>
                                    <MainInput />
                                    <MainButton>Send</MainButton>
                                </MainForm>
                            </BottomContainer>

                        </React.Fragment>
                        : <Loading>Loading...</Loading>}

                </MainChatContainer>

            </MainContainer>
        );
    }
}

export default Main;