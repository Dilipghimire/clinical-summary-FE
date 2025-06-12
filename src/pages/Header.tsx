import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { useProfile } from "../hooks/useProfile";
import { usePatientInfo } from "../context/PatientInfoContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");
  const { data } = useProfile();
  const profileName = data?.email?.sub;
  const { setPatientInfo } = usePatientInfo();

  const handleLogout = async () => {
    setPatientInfo({
      first_name: "",
      middle_name: "",
      last_name: "",
      date_of_birth: "",
      email: "",
    });
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleNewReport = async () => {
    setPatientInfo({
      first_name: "",
      middle_name: "",
      last_name: "",
      date_of_birth: "",
      email: "",
    });
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
