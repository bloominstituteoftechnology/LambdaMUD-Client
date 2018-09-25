import React, { Component } from 'react';



class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() { 
        return (
            <div> 
                <input
          className="input"
        //   value={this.state.notetitle}
          name="notetitle"
          type="text"
          placeholder="username"
        //   onChange={this.handleInputChange}
        />
        <input
          className="input"
        //   value={this.state.notetitle}
          name="notetitle"
          type="text"
          placeholder="password1"
        //   onChange={this.handleInputChange}
        />
        <input
          className="input"
        //   value={this.state.notetitle}
          name="notetitle"
          type="text"
          placeholder="password2"
        //   onChange={this.handleInputChange}
        />
        
                
                
            </div>
        );
    }
}


export default Registration;