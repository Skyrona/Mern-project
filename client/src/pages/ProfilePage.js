import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Auth from "../components/Auth";

const ProfilePage = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <h1>UPDATE PAGE</h1>
      ) : (
        <div className="log-container">
          <Auth signin={false} />
          <div className="img-container">
            <img src="./img/log.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
