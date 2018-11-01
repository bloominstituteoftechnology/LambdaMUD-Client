import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';

import {Tabs, Tab} from 'material-ui/Tabs';

// This component is a container for the registration and login views
// They are separated into tabs which the user can toggle between
class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 'a',
        };
      }
      // the default tab is set to the login view
      // this is the toggle handler for the tabs
      handleChange = (value) => {
        this.setState({
          value: value,
        });
      };

    render() {
        return (
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            >
            <Tab label="Login" value="a">
                <Login />
            </Tab>
            <Tab label="Register" value="b">
                <Register />
            </Tab>
          </Tabs>
        );
      }
};

export default Authentication;