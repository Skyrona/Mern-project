import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Logout = () => {
  const removeCookie = useCookies();

  const logout = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        removeCookie("jwt");
      })
      .catch((err) => console.log(err));
    
    window.location = "/";
  };

  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
