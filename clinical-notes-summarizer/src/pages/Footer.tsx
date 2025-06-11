import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} Your Company Name. All rights
        reserved.
      </p>
      <p>
        <a href="/privacy" className={styles.links}>
          Privacy Policy
        </a>
        {" | "}
        <a href="/terms" className={styles.links}>
          Terms of Service
        </a>
      </p>
      <p>
        This website uses cookies to enhance your experience. By continuing to
        browse, you agree to our use of cookies.
      </p>
      <p>
        We do not store any documents or personal data. All personal data and
        documents are deleted immediately after generating the report.
      </p>
    </footer>
  );
}
