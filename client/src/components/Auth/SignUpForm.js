import axios from "axios";
import React, { useState } from "react";

const SignUpForm = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  const [errors, setErrors] = useState({
    pseudo: "",
    email: "",
    password: "",
    controlPassword: "",
    checked: "",
  });

  const setErrorsFunc = (name, value) => {
    setErrors((errors) => ({
      ...errors,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let hasErrors = false;

    setErrors({
        pseudo: "",
        email: "",
        password: "",
        controlPassword: "",
        checked: "",
      });

    if (!pseudo) {
      setErrorsFunc("pseudo", "Pseudo is empty");
      hasErrors = true;
    }

    if (!email) {
      setErrorsFunc("email", "Email is empty");
      hasErrors = true;

    }

    if (!password) {
      setErrorsFunc("password", "Password is empty");
      hasErrors = true;

    }

    if (password !== controlPassword) {
      setErrorsFunc("controlPassword", "Passwords are different");
      hasErrors = true;

    }

    if (!checked) {
      setErrorsFunc("checked", "Please agree to the general conditions");
      hasErrors = true;

    }

    if (!hasErrors) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/user/register`, {
          pseudo,
          email,
          password,
        })
        .then((res) => {
          if (res.data.errors) {
              setErrorsFunc("pseudo", res.data.errors.pseudo);
              setErrorsFunc("email", res.data.errors.email);
              setErrorsFunc("password", res.data.errors.password);
          } else {
              setIsAccountCreated(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <form action="" onSubmit={handleRegister} id="sign-up-form">
      <label htmlFor="pseudo">Pseudo</label>
      <br />
      <input
        type="text"
        name="pseudo"
        id="pseudo"
        onChange={(e) => setPseudo(e.target.value)}
        value={pseudo}
      />
      <div className="pseudo error">{errors.pseudo}</div>

      <br />

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

      <label htmlFor="controlPassword">Control password</label>
      <br />
      <input
        type="password"
        name="controlPassword"
        id="controlPassword"
        onChange={(e) => setControlPassword(e.target.value)}
        value={controlPassword}
      />
      <div className="control-password error">{errors.controlPassword}</div>

      <br />
      <input type="checkbox" id="terms" onClick={(e) => setChecked(!checked)} />
      <label htmlFor="terms">J'accepte les trucs</label>
      <div className="terms error">{errors.checked}</div>

      <input type="submit" value="Sign up" />
      {isAccountCreated && <h4 className="success">Account created, please check your mails to confirm your inscription.</h4>}
    </form>
  );
};

export default SignUpForm;
