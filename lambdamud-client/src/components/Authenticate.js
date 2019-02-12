import React, {Component} from 'react';

// The Authenticate file shows functions to let a certain user login and logout

const Authenticate = App =>
  class extends Component {
      state = {
          loggedIn: false
      }

      componentDidMount() {
          if (localStorage.getItem('key')) {
              this.setState({ loggedIn: true});
          } else {
              this.props.history.push('/login')
          }
      }

      logout = e => {
          e.preventDefault();
          localStorage.removeItem("key");
          this.setState({ loggedIn: false });
          this.props.history.push('/login');
      }

      render() {
          if (this.state.loggedIn) {
            return (
            <App logout ={this.logout} />
            );
          } else {
              return null;
          }
      }
  };

  export default Authenticate;