import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Signin from './components/Auth/Signin'
import SignUp from './components/Auth/SignUp';
import Mud from './components/Mud/Mud';

class App extends React.Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){}

  render() {
    return (
      <div>
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/mud' component={Mud} />
      </div>
    )
  }
}

export default withRouter(App);