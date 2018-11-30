import React from "react";
import "../styles/forms.css";

const Login = () => {
    return (
        <div>
            <form>
                <h3>Login</h3>
                <input type="text" name="username" placeholder="username" />
                <input type="text" name="password" placeholder="password" />
                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;