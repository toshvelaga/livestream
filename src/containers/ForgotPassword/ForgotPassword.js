import React, { useState } from "react";
import "./ForgotPassword.css";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Buttons/Button";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <>
      <div className="login-container">
        <h1 style={{ marginBottom: "2rem", color: "#fff" }}>
          Please enter your email to reset your password...
        </h1>
        <div>
          <TextInput
            label="Email Address"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-button">
          <Button style={{ width: "100%" }} title="Submit" />
        </div>
        <p style={{ color: "grey", marginTop: "1rem", textAlign: "center" }}>
          <Link
            style={{
              textDecoration: "none",
              color: "grey",
            }}
            to="/register"
          >
            Don't have an account? Sign up here
          </Link>
        </p>
      </div>
    </>
  );
}

export default ForgotPassword;
