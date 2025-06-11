import React from "react";
import styles from "./Button.module.scss";

type ButtonType = "primary" | "secondary" | "link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonType;
  width?: string | number;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  width,
  ...rest
}) => {
  const buttonStyle = width ? { width } : undefined;
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      style={buttonStyle}
      {...rest}
    >
      {children}
    </button>
  );
};
