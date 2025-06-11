import React, { createContext, useState, useContext } from "react";

export type PatientFormType = {
  first_name: string;
  middle_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
};

const PatientInfoContext = createContext<{
  patientInfo: PatientFormType;
  setPatientInfo: React.Dispatch<React.SetStateAction<PatientFormType>>;
} | null>(null);

export const PatientInfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [patientInfo, setPatientInfo] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
  });

  return (
    <PatientInfoContext.Provider value={{ patientInfo, setPatientInfo }}>
      {children}
    </PatientInfoContext.Provider>
  );
};

export const usePatientInfo = () => {
  const context = useContext(PatientInfoContext);
  if (!context) {
    throw new Error("usePatientInfo must be used within a PatientInfoProvider");
  }
  return context;
};
