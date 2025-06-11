import React from "react";
import styles from "./NoDataPage.module.scss";

const NoDataPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>No Data Available.Please refresh the page.</p>
      <p className={styles.note}>
        If you have completed all the steps and still see this issue, it might
        be an internal problem.
      </p>
    </div>
  );
};

export default NoDataPage;
