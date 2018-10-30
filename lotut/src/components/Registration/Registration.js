import React, { Component } from 'react';
import './index.css';



class Registration extends Component {
    render() {
        return (
            <form onSubmit={this.register} className="regForm">
        <div className="regOverlay">
            <div className="greeting">Welcome!</div>
            <br /><br />
            <div>
                <input
                    className="styledInput"
                    name= "Login" 
                    value={null} 
                    onChange={null} 
                    type ="text"
                    placeholder="Username"
                />
            </div>
            <div>
                <input 
                    className="styledInput"
                    name="password" 
                    value={null}
                    onChange={null}
                    type ="password"
                    placeholder="Password"
                />
                <input 
                    className="styledInput"
                    name="password" 
                    value={null}
                    onChange={null}
                    type ="password"
                    placeholder="Password again"
                />
            </div>
            
            <div>
                
                <button 
                    className="regButton"
                    // value={this.state.password} 
                    onChange={null} 
                    type="submit" 
                    >Connect</button>
                
            </div>
                <div to="/login" className="alt">login </div>
            </div>
        </form>
        );
        }
    }
    
export default Registration;
    