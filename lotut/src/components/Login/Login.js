import React, { Component } from 'react';
import '../Registration/index.css';
import { Link } from 'react-router-dom';




class Login extends Component {
    
    render() {
        return (
            <form onSubmit={null} className="regForm">
            
            <div className="regOverlay">
                <div className="greeting">Login</div>
                    <br /><br />
                <div>
                    
                    <input
                        className="styledInput"
                        name= "username" 
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
                </div>
                <div>
                    <button
                        className="regButton"
                        value={null} 
                        onChange={null} type="submit">Connect
                    </button>
                </div>
                    <Link to="/register" className="alt">register</Link>
                </div>
                
            </form>
        );
    }

    
    

}




export default Login;