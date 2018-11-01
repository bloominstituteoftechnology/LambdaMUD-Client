import React from "react";


export default function Login(props) {

  return (
    <div className="form">
      <div className="form-title">Login</div>

      
      <div className="form-body">
        <form onSubmit={props.loginHandler}>
          
        <div className="form-inputgroup">
          <h1>username: </h1>
          <input
            type="text"
            className="form-inputusername"
            name="username"
            onChange={props.inputHandler}
            value={props.username}
            autocomplete="off"
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
            autocomplete="off"
          />
          </div>

          <button className="form-button-general">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
