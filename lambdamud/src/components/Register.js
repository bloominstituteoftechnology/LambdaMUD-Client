import React from "react";

export default function Register(props) {
  return (
    <div className="form">
      <div className="form-title">Register</div>

      <div className="form-body">
        <form onSubmit={props.registerHandler}>
          <div className="form-inputgroup">
            <h1>username: </h1>
            <input
              type="text"
              className="form-inputusername"
              name="username"
              onChange={props.inputHandler}
              value={props.username}
            />
          </div>

          <div className="form-inputgroup">
            <h1>password: </h1>
            <input
              type="password"
              className="form-inputpassword"
              name="password1"
              onChange={props.inputHandler}
              value={props.password1}
            />
          </div>

          <div className="form-inputgroup">
            <h1>re-enter password: </h1>
            <input
              type="password"
              className="form-inputpassword"
              name="password2"
              onChange={props.inputHandler}
              value={props.password2}
            />
          </div>

          <button className="form-button-general">Register</button>
        </form>
      </div>
    </div>
  );
}
