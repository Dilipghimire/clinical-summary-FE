import React from "react";
import { useField } from "formik";
import styles from "./FormikInput.module.scss";

interface FormikInputProps {
  label?: string;
  name: string;
  type?: "text" | "password" | "number" | "email" | "decimal" | "date" | "file";
  placeholder?: string;
  required?: boolean;
}

const FormikInput: React.FC<FormikInputProps> = ({
  label,
  type = "text",
  ...props
}) => {
  const [field, meta] = useField(props.name);

  const inputType = type === "decimal" ? "number" : type;

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={props.name} className={styles.label}>
        {label} {props.required && <span aria-hidden="true">*</span>}
      </label>
      <input
        {...field}
        {...props}
        type={inputType}
        step={type === "decimal" ? "any" : undefined}
        className={`${styles.input} ${meta.touched && meta.error ? styles.errorInput : ""}`}
        aria-describedby={`${props.name}-error`}
        aria-invalid={!!meta.error && meta.touched}
      />
      {meta.touched && meta.error && (
        <div id={`${props.name}-error`} className={styles.error}>
          {meta.error}
        </div>
      )}
    </div>
  );
};

export default FormikInput;
