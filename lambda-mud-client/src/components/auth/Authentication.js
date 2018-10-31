import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';

import {Tabs, Tab} from 'material-ui/Tabs';

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 'a',
        };
      }
    
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