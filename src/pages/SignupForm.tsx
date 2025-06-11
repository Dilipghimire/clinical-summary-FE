import React, { useState } from "react";
import styles from "./SignupForm.module.scss";
import { Form, Formik } from "formik";
import FormikInput from "../components/input/FormikInput";
import { Button } from "../components/button/Button";
import * as Yup from "yup";
import { useSignup } from "../hooks/useSignup";
import Loading from "../components/loading/Loading";

type SigninFormType = {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SigninFormProps = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

export const SignupForm: React.FC<SigninFormProps> = ({ setIsLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [Errors, setErrors] = useState("");
  const { mutateAsync } = useSignup();

  const SingUpFormContent = () => {
    return (
      <div>
        <h2>Create Your Account</h2>
        <Form>
          <FormikInput type="text" name="first_name" placeholder="First name" />
          <FormikInput
            type="text"
            name="middle_name"
            placeholder="Middle name"
          />
          <FormikInput type="text" name="last_name" placeholder="Last name" />
          <FormikInput type="email" name="email" placeholder="Email" />
          <FormikInput type="password" name="password" placeholder="Password" />
          <FormikInput
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
          />
          <Button type="submit" width="100%">
            Sign Up
          </Button>
        </Form>
        <p
          className={styles.toggleText}
          onClick={() => setIsLogin((prev) => !prev)}
        >
          Already have an account? <span>Login</span>
        </p>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}
      <Formik<SigninFormType>
        initialValues={{
          first_name: "",
          middle_name: "",
          last_name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async ({
          first_name,
          middle_name,
          last_name,
          email,
          password,
        }) => {
          try {
            setIsLoading(true);
            await mutateAsync({
              first_name,
              middle_name,
              last_name,
              email,
              password_hash: password,
            });
          } catch (error: any) {
            setIsLoading(false);
            console.error("Login failed", error);
            // setErrors("Invalid credentials");
          } finally {
            setIsLoading(false);
          }
        }}
      >
        <SingUpFormContent />
      </Formik>
    </div>
  );
};
