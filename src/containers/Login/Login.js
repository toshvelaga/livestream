import React, { useEffect, useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
// import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [errorMsgEmail, seterrorMsgEmail] = useState("");
  //   const [errorMsgPassword, seterrorMsgPassword] = useState("");

  return (
    <>
      <div className="login-container">
        <div>
          <TextInput
            label="Email Address"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* {errorMsgEmail ? <ErrorMessage errorMsg={errorMsgEmail} /> : null} */}
        </div>
        <div>
          <TextInput
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* {errorMsgPassword ? (
            <ErrorMessage errorMsg={errorMsgPassword} />
          ) : null} */}
        </div>
        <p>
          <Link
            style={{
              textDecoration: "none",
              color: "grey",
            }}
            to="/forgot-password"
          >
            Forgot your username or password?
          </Link>
        </p>
        <div className="login-button">
          {/* <PrimaryButton style={{ width: "100%" }} title="Submit" fx={submit} /> */}
        </div>
        <p style={{ color: "grey", marginTop: "1rem", textAlign: "center" }}>
          <Link
            style={{
              textDecoration: "none",
              color: "grey",
            }}
            to="/register"
          >
            Don't have an account? Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
