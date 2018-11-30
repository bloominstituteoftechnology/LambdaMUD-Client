import React from "react";
import "../styles/forms.css";
const SignUp = () => {
    return (
        <div>
            <form>
                <h3>Create an Account</h3>
                <input
                    type="username"
                    name="username"
                    id="username"
                    placeholder="Username"
                />

                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                />

                <input
                    type="password"
                    name="confirm_pw"
                    id="confirm_pw"
                    placeholder="confirm"
                />

                <button>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
