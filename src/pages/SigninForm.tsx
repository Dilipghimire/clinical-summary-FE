import React, { useState } from "react";
import styles from "./SigninForm.module.scss";
import { SignupForm } from "./SignupForm";
import { Form, Formik } from "formik";
import FormikInput from "../components/input/FormikInput";
import * as Yup from "yup";
import { Button } from "../components/button/Button";
import { useLogin } from "../hooks/useLogin";
import Loading from "../components/loading/Loading";
import Header from "./Header";

type SigninType = {
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const SigninForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setErrors] = useState("");
  const { mutateAsync } = useLogin();

  const SignInFormContent = () => {
    const toggleMode = () => setIsLogin(!isLogin);
    return (
      <div>
        <h2>Login</h2>
        <Form>
          <FormikInput type="text" name="email" placeholder="Email" />
          <FormikInput type="password" name="password" placeholder="Password" />
          <Button type="submit" width="100%">
            Sign in
          </Button>
        </Form>

        <p onClick={toggleMode} className={styles.toggleText}>
          Don't have an account? <span>Sign Up</span>
        </p>
      </div>
    );
  };

  return (
    <div className={styles.mainSection}>
      {isLoading && <Loading />}
      {isLogin ? (
        <div className={styles.container}>
          <Formik<SigninType>
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async ({ email, password }) => {
              try {
                setIsLoading(true);
                await mutateAsync({ email, password });
              } catch (error: any) {
                setIsLoading(false);
                console.error("Login failed", error);
                // setErrors("Invalid credentials");
              } finally {
                setIsLoading(false);
              }
            }}
          >
            <SignInFormContent />
          </Formik>
        </div>
      ) : (
        <SignupForm setIsLogin={setIsLogin} />
      )}
      <div className={styles.infoSection}>
        <h1>Let AI Help Summarize Your Clinical Notes</h1>
        <p>
          Upload EHR or clinic reports and instantly receive clear summaries and
          patient-friendly explanations using advanced AI. Save time, reduce
          errors, and enhance communication.
        </p>
        <ul>
          <li>🧠 AI-powered summarization</li>
          <li>📋 SOAP format insights</li>
          <li>👨‍⚕️ Simplified explanation for patients</li>
        </ul>
      </div>
    </div>
  );
};

export default SigninForm;
