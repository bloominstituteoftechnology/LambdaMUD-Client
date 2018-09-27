import React from 'react';

const Authenticate = Protected => class extends React.Component {
    state = {
        loggedIn: false
    }

    componentDidMount() {
        if (sessionStorage.getItem('key')) {
            this.setState({ loggedIn: true });
        }
        else {
            this.props.history.push('/Login');
        }
    }

    logout = e => {
        e.preventDefault();
        sessionStorage.removeItem('key');
        this.setState({ logginIn: false });
        this.props.history.push('/Login');
    }

    render() {
        if (this.state.logginIn) {
            return (
                <Authenticate logout={this.logout} />
            );
        }
        else {
            return null
        }
    }
}

export default Authenticate;