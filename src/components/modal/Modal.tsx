// /components/Modal/Modal.tsx
import React from "react";
import styles from "./Modal.module.scss";
import { useModal } from "../../context/ModelContext";
import { Button } from "../button/Button";

interface ModalProps {
  title: string;
  body: React.ReactNode;
  onApplyBtn: any;
}

export const Modal: React.FC<ModalProps> = ({ title, body, onApplyBtn }) => {
  const { isOpen, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <div className={styles.body}>{body}</div>
        <div className={styles.actions}>
          <Button className={styles.cancel} onClick={closeModal}>
            Cancel
          </Button>
          <Button className={styles.apply} onClick={onApplyBtn}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};
