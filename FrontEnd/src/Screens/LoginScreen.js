import React, { useState, useContext ,useEffect} from "react";
import { ProductContext } from "../context/context";
import { Redirect } from "react-router-dom";

export default function LoginScreen() {
  const context = useContext(ProductContext);
  const { loginHandler, signupHandler, loggedin } = context;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [cpass, setCpass] = useState("");
  
    if(loggedin){
        return <Redirect to="/" />
    }

  return (
    <div className="MainLogin">
      <div className="MainLogin__signup">
        <h1>Create Account</h1>
        <div className="MainLogin__signup--input">
          <input
            className="MainLogin__signup--input-1"
            name="name"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          ></input>
          <input
            className="MainLogin__signup--input-1"
            type="email"
            name="Email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          ></input>
          <input
            className="MainLogin__signup--input-1"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => setPass(event.target.value)}
          ></input>
          <input
            className="MainLogin__signup--input-1"
            type="password"
            name="password"
            placeholder=" ConfirmPassword"
            onChange={(event) => setCpass(event.target.value)}
          ></input>
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <button onClick={() => signupHandler(name, email, pass, cpass)}>
            Sign-Up
          </button>
        </div>
      </div>
      <div className="MainLogin__login">
        <h1>Welcome To Extreme-Joy</h1>
        <h1>Sign-In Now!</h1>
        <div className="MainLogin__login--input">
          <input
            className="MainLogin__login--input-1"
            name="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          ></input>
          <input
            className="MainLogin__login--input-1"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => setPass(event.target.value)}
          ></input>
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <button onClick={() => loginHandler(email, pass)}>
            Sign-In
          </button>
        </div>
      </div>
    </div>
  );
}
