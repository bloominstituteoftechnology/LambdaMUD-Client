import React from 'react'
import Login from './Login'

const Authenticate = ProtectedComponent => 
    class InnerApp extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                loggedIn: false
            }
        }
    
    /* Component displays only if localStorage contains a certain value */

    componentDidMount() {
        if (localStorage.getItem('key')) this.setState({
         loggedIn: true
       });
     }

     render() {
        return (this.state.loggedIn ? <ProtectedComponent auth={this.props} /> : <Login />);
    }
}

export default Authenticate