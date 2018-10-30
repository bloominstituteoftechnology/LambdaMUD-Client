import React, { Component } from 'react';
import '../Registration/index.css';





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
                    <div to="/" className="alt">register</div>
                </div>
                
            </form>
        );
    }

    
    

}




export default Login;