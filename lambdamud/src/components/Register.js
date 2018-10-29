import React from "react";


export default function Register(props) {

  return (
    <div className="form">
      <div className="form-title">Register</div>

      <div className="form-body">
        <form onSubmit={props.registerHandler}>
          <input
            type="text"
            className="form-inputusername"
            name="username"
            onChange={props.inputHandler}
            placeholder="username"
            value={props.username}
          />

          <input
            type="text"
            className="form-inputpassword"
            name="password1"
            onChange={props.inputHandler}
            placeholder="Enter Your Password"
            value={props.password1}
          />

          <input
            type="text"
            className="form-inputpassword"
            name="password2"
            onChange={props.inputHandler}
            placeholder="Please Re-Enter Your Password"
            value={props.password2}
          />

          <button className="form-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
