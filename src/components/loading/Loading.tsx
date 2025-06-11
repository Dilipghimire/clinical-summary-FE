import React from "react";
import styles from "./Loading.module.scss";

const Loading: React.FC = () => {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.spinner} />
    </div>
  );
};

export default Loading;
