import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/button/Button";
import { useUpload } from "../hooks/useUpload";
import Loading from "../components/loading/Loading";
import { isObjectEmpty } from "../utils/util";
import { useNavigate } from "react-router-dom";
import { usePatientInfo } from "../context/PatientInfoContext";
import styles from "../pages/UploadFiles.module.scss";

const UploadFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { patientInfo } = usePatientInfo();
  const { mutateAsync, isPending } = useUpload();

  useEffect(() => {
    if (isObjectEmpty(patientInfo)) {
      navigate("/patient-info");
    }
  }, [patientInfo]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await mutateAsync({ files });
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error uploading documents", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {(isPending || isLoading) && <Loading />}
      <p className={styles.privacyText}>
        🔒 <strong>Privacy Policy:</strong> Your uploaded documents are used
        only to generate a summary and are permanently deleted immediately after
        processing. No personal data is stored.
      </p>
      <form onSubmit={handleSubmit}>
        <div className={styles.uploadContainer}>
          <div className={styles.uploadBox} onClick={openFileDialog}>
            <p className={styles.uploadText}>Click to upload or drag & drop</p>
            <p className={styles.uploadSubtext}>
              Accepted formats: PDF, TXT, HTML, JSON
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              accept=".pdf,.txt,.html,.json"
              hidden
            />
          </div>

          {files.length > 0 && (
            <div className={styles.fileList}>
              {files.map((file, index) => (
                <div className={styles.fileItem} key={index}>
                  <span className={styles.fileName}>{file.name}</span>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFile(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          {files.length > 0 && (
            <Button variant="primary" width={"70%"}>
              Upload
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UploadFiles;
