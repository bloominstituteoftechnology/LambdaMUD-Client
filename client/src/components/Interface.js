import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {initialize} from '../actions/index';

class Interface extends React.Component {

    componentDidMount(){
        var token = localStorage.getItem('jwt');
        this.props.initialize(token)
        console.log(token)
    }

    constructor(props){
        super(props);
        this.state = {
            readout : this.props.readout,
            command : ''
        }
    }

    handleInput = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div className = 'interface-container'>
            <h1>Interface</h1>
            <div className = 'readout-container'>
            <p>Readout will go here</p>
            
            </div>
            <div className = 'command-container'>
            <input type = 'text' name='command' value={this.state.command} onChange={this.handleInput}></input>
            </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        readout: state.readout
    }
}

export default withRouter(connect(mapStateToProps, {
    initialize,
})(Interface));