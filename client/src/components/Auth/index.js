import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Authentication = ({signin}) => {
  const [signInModal, setSignInModal] = useState(signin);

  const handleModal = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
    } else if (e.target.id === "login") {
      setSignInModal(true);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModal}
            id="register"
            className={signInModal ? null : "active-btn"}
          >
            Sign up
          </li>
          <li
            onClick={handleModal}
            id="login"
            className={signInModal ? "active-btn" : null}
          >
            Sign in
          </li>
        </ul>
        {!signInModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Authentication;
