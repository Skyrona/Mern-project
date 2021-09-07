import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.errors) {
          setErrors({
            email: res.data.errors.email,
            password: res.data.errors.password,
          });
        } else {
            window.location = "/";
        }
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-in-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error">{errors.email}</div>

      <br />

      <label htmlFor="password">Password</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error">{errors.password}</div>

      <br />
      <input type="submit" value="Sign in" />
    </form>
  );
};

export default SignInForm;
