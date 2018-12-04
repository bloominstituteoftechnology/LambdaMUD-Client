import React from 'react';
import axios from 'axios';
// something's gotta give soon
// this is crazy

export default class GetSomething extends React.Component {
    state = {
        stuff: []
    }
    componentDidMount() {
        axios.get(`https://sean-lambdamud.herokuapp.com/admin`)
    }
}