import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { useProfile } from "../hooks/useProfile";
import { useDelete } from "../hooks/useDeleteNamespace";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");
  const { data } = useProfile();
  const profileName = data?.email?.sub;

  const handleLogout = async () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleNewReport = async () => {
    navigate("/patient-info");
  };

  if (!isLoggedIn) return null;

  return (
    <div className={styles.header}>
      <div>
        👋 Welcome, <strong>{profileName || "User"}</strong>
      </div>
      <div className={styles.leftnavbar}>
        <button onClick={handleNewReport} className={styles.logoutButton}>
          Start New Report
        </button>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
