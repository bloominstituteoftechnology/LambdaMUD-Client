import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import MainPage from '../components/Main/MainPage';

class MainView extends Component {

    render() {
        let isLogged = false;
        if (localStorage.getItem('key')) {
            isLogged = true;
        } else {
            isLogged = false;
        }
        return (
            <Fragment>
                {!isLogged ? 'You must login' : <MainPage {...this.props} /> }
            </Fragment>
        )
    }
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(MainView)