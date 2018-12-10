import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import MainPage from '../components/Main/MainPage';
import Room from '../components/Main/Room';
import axios from "axios";

class MainView extends Component {
    state = {
        command: '',
        title: '',
        description: '',
    }

    handleChange = e => {
        this.setState({
            ...this.state.command,
            command: e.target.value
        });
    };

    handleSubmit = e => {
        let token = localStorage.getItem('key');
        console.log(token);

        let config = {
            headers: {
                Authorization: `Token ${token}`
            }
        }

        const endpoint = 'http://localhost:8000/api/adv/move';

        const command = { "direction": `${this.state.command}`};

        axios.post(endpoint, command, config).then(res => {
            console.log(res);
            this.setState({
                title: res.data.title,
                description: res.data.description
            });
        }).catch(err => {
            console.log('MOVE_ERROR', err)
        })
    }

    render() {
        let isLogged = false;
        if (localStorage.getItem('key')) {
            isLogged = true;
        } else {
            isLogged = false;
        }
        return (
            <Fragment>
                {!isLogged ? 'You must login' : <MainPage
                    {...this.props}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    command={this.state.command}
                    title={this.state.title}
                    description={this.state.description}
                /> }
            </Fragment>
        )
    }
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(MainView)