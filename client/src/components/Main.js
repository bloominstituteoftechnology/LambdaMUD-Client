import React from 'react';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import axios from 'axios';
import background from '../background/background.jpg';

injectGlobal`
    body {
        background-image: url(${background});
        background-size: cover;
    }
`

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    
    componentDidMount() {
        const token = localStorage.getItem('lambda-token');
        if (!token) {
            this.props.history.replace('/login')
        }
    }

    render() { 
        return ( 
            <div>
                Hello
            </div>
         );
    }
}

export default Main;