import React from "react";


export default function Login(props) {

  return (
    <div className="form">
      <div className="form-title">Login</div>

      <div className="form-body">
        <form onSubmit={props.loginHandler}>
          <input
            type="text"
            className="form-inputusername"
            name="username"
            onChange={props.inputHandler}
            placeholder="Username"
            value={props.username}
          />

          <input
            type="text"
            className="form-inputpassword"
            name="password1"
            onChange={props.inputHandler}
            placeholder="Password"
            value={props.password1}
          />

          <button className="form-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
