import React from 'react';
import Modal from './Modal/Modal';
import axios from 'axios';
import MainUserInfo from './MainUserInfo';
import { MainHeaderContainer, MainHeader } from './StyledComponents/Header';
import { MainContainer, MainChatContainer, MainChat, BottomContainer, MainForm, MainInput, MainButton, MainPlayer, Loading } from './StyledComponents/Main';

class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            user_input: '',
            modal: false,
            loggedIn: false,
            user_start: [],
            user_moved: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('https://salty-tundra-21950.herokuapp.com/api/adv/init/', { headers: { Authorization: 'Token ' + token } })
                .then(response => this.setState({ user_start: response.data, loggedIn: true }))
                .catch(() => this.setState({ modal: true }))

        } else {
            this.setState({ modal: true });
        }
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    move = event => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const header = { headers: { Authorization: 'Token ' + token } };
        const direction = { direction: this.state.user_input };

        axios
            .post('https://salty-tundra-21950.herokuapp.com/api/adv/move', direction, header)
            .then(response => {
                const user_moved = this.state.user_moved.slice();
                user_moved.push(response.data);
                this.setState({ user_moved, user_input: '' })
            })
            .catch(err => console.log(err));
    }

    logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    render() {
        return (
            <MainContainer>

                <Modal modal={this.state.modal} history={this.props.history} />

                <MainHeaderContainer>
                    <MainHeader onClick={this.logout}>Main Screen</MainHeader>
                </MainHeaderContainer>

                <MainChatContainer>

                    {this.state.loggedIn ?
                        <React.Fragment>

                            <MainChat>

                                <div>
                                    <p>{this.state.user_start.title}</p>
                                    <p>{this.state.user_start.description}</p>
                                    {this.state.user_start.players.map(player => <MainPlayer key={Math.random()}>{player} is standing here</MainPlayer>)}
                                </div>

                                {this.state.user_moved.map(user => <MainUserInfo key={Math.random()} user={user} />)}

                            </MainChat>

                            <BottomContainer>
                                <MainForm onSubmit={this.move}>
                                    <MainInput onChange={this.handleInput} type='text' value={this.state.user_input} name='user_input' />
                                    <MainButton onClick={this.move}>Send</MainButton>
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