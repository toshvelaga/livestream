import React, { useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
// import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <>
      <div className="register-container">
        <div>
          <TextInput
            label="First Name"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
        </div>
        <div>
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
        </div>
        <div>
          <TextInput
            label="Email Address"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextInput
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <TextInput
            label="Confirm Password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div className="register-button">
          {/* <PrimaryButton style={{ width: "100%" }} title="Submit" fx={submit} /> */}
        </div>
        <p style={{ color: "grey", marginTop: "1rem", textAlign: "center" }}>
          <Link
            style={{
              textDecoration: "none",
              color: "grey",
            }}
            to="/login"
          >
            Already have an account? Sign in
          </Link>
        </p>
      </div>
    </>
  );
}

export default Register;
