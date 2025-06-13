import React from "react";
import styles from "./PatientInfo.module.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikInput from "../components/input/FormikInput";
import { Button } from "../components/button/Button";
import { useNavigate } from "react-router-dom";
import { usePatientInfo } from "../context/PatientInfoContext";
import { isValid, parseISO, isAfter, isBefore } from "date-fns";

type PatientFormType = {
  first_name: string;
  middle_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
};
const MIN_DATE = new Date("1900-01-01");
const MAX_DATE = new Date();

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  date_of_birth: Yup.string()
    .required("Date of birth is required")
    .test("valid-date", "Date is invalid", (value) => {
      if (!value) return false;
      const date = parseISO(value);
      return isValid(date);
    })
    .test("min-date", "Date must be after January 1, 1900", (value) => {
      if (!value) return false;
      const date = parseISO(value);
      return isAfter(date, MIN_DATE);
    })
    .test("max-date", "Date cannot be in the future", (value) => {
      if (!value) return false;
      const date = parseISO(value);
      return isBefore(date, MAX_DATE);
    }),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const PatientInfoForm: React.FC = () => {
  const navigate = useNavigate();
  const { setPatientInfo, patientInfo } = usePatientInfo();

  return (
    <div className={styles.patientFormLayout}>
      <div className={styles.formWrapper}>
        <p className={styles.privacyText}>
          🔒 <strong>Privacy Policy:</strong> Your information are used only to
          generate a summary and are permanently deleted immediately after
          processing. No personal data is stored.
        </p>
        <h2>Patient Information</h2>
        <p>
          Please provide the required details to summarize your clinical notes.
        </p>
        <hr />

        <Formik<PatientFormType>
          initialValues={{
            first_name: patientInfo.first_name,
            middle_name: patientInfo.middle_name,
            last_name: patientInfo.last_name,
            date_of_birth: patientInfo.date_of_birth,
            email: patientInfo.email,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setPatientInfo({ ...patientInfo, ...values });
            if (patientInfo) {
              navigate("/upload-files");
            }
          }}
        >
          <Form className={styles.gridForm}>
            <div className={styles.row}>
              <FormikInput name="first_name" type="text" label="First name" />
              <FormikInput name="middle_name" type="text" label="Middle name" />
              <FormikInput name="last_name" type="text" label="Last name" />
            </div>
            <div className={styles.row}>
              <FormikInput
                name="date_of_birth"
                type="date"
                label="Date of birth"
              />
              <FormikInput name="email" type="email" label="Email" />
            </div>
            <Button width="60%">Next</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
