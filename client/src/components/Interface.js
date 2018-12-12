import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {initialize, move} from '../actions/index';

class Interface extends React.Component {

    componentDidMount(){
        var token = localStorage.getItem('jwt');
        this.props.initialize(token)
        console.log(token)
    }

    componentWillReceiveProps(newProps){
        if(newProps.readout != this.state.readout){
            this.setState({
                readout: newProps.readout
            })
        }
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

    handleSubmit = event => {
        event.preventDefault();
        let token = localStorage.getItem('jwt');

        // parse movements
        if(this.state.command == 'n' || 's' || 'e' || 'w'){
            // call move action
            let direction = this.state.command;
            this.props.move(token, direction)
            // reset command prompt
            this.setState({
                command: ''
            })
        }

        // parse other commands
    }

    render(){
        return(
            <div className = 'interface-container'>
            <h1>Interface</h1>
            <div className = 'readout-container'>
            <h2>{this.state.readout.title}</h2>
            <p>{this.state.readout.description}</p>
            
            <div className = 'active-players'>
            <h3>Active Players</h3>
            <p>{this.state.readout.players}</p>
            </div>
            
            </div>
            <div className = 'command-container'>
            <form onSubmit={this.handleSubmit}>
            <input type = 'text' name='command' value={this.state.command} onChange={this.handleInput} placeholder='Input Commands Here'></input>
            <button type = 'submit'>Send</button>
            </form>
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
    move,
})(Interface));