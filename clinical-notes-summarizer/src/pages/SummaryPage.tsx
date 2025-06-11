import React, { useState, useContext, useRef, useEffect } from "react";
import styles from "./SummaryPage.module.scss";
import { useModal } from "../context/ModelContext";
import GetSummaryModal from "./SummaryModal/GetSummaryModal";
import { usePatientInfo } from "../context/PatientInfoContext";
import { useGetSummary } from "../hooks/useGetSummary";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import NoDataPage from "./NoDataPage";
import { isObjectEmpty } from "../utils/util";

const SummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const summaryPrintRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const patient_pc_namespace = location.state?.responseData;
  const { openModal, closeModal } = useModal();
  const { patientInfo, setPatientInfo } = usePatientInfo();
  const [isReportGenerated, setReportGenerated] = useState(false);

  const {
    data: clinicalNoteSummary,
    refetch,
    isLoading,
  } = useGetSummary(patient_pc_namespace);

  const handleApply = () => {
    setReportGenerated(true);
    refetch();
    closeModal();
  };

  useEffect(() => {
    const handleBackButton = () => {
      setPatientInfo({
        first_name: "",
        last_name: "",
        middle_name: "",
        email: "",
        date_of_birth: "",
      });
    };

    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  useEffect(() => {
    if (isObjectEmpty(patientInfo)) {
      navigate("/patient-info");
    }
  });

  const fullName =
    `${patientInfo.first_name} ${patientInfo.middle_name ?? ""} ${patientInfo.last_name}`
      .replace(/\s+/g, " ")
      .trim();
  const handlePrint = () => {
    if (!summaryPrintRef.current) return;

    const printContent = summaryPrintRef.current.innerHTML;
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  return clinicalNoteSummary != "" ? (
    <div className={styles.container}>
      {isLoading && <Loading />}
      <h2>Patient Report Summary</h2>
      <div className={isReportGenerated ? styles.reportGrid : styles.grid}>
        {/* Left Side */}

        {!isReportGenerated && (
          <div className={styles.leftPane}>
            <p>
              Ready to generate a summary for <strong>{fullName}</strong> (
              {patientInfo.email})?
            </p>
            <button onClick={() => openModal()}>Get Summary</button>
          </div>
        )}

        {/* Right Side */}
        <div className={styles.rightPane} ref={summaryPrintRef}>
          <div className={styles.actions}>
            <button onClick={() => handlePrint()}>🖨</button>
            <button>📧</button>
          </div>
          <div className={styles.patientInfo}>
            <h3>Clinical notes summary</h3>
            {patientInfo.first_name}
            {patientInfo.middle_name}
            {patientInfo.last_name} |{patientInfo.date_of_birth} |
            {patientInfo.email}
          </div>{" "}
          <hr />{" "}
          {clinicalNoteSummary ? (
            <div className={styles.soapContainer}>
              <div className={styles.section}>
                <strong>Subjective:</strong>
                <p>{clinicalNoteSummary?.summary?.subjective || "N/A"}</p>
              </div>

              <div className={styles.section}>
                <strong>Objective:</strong>
                <ul>
                  {clinicalNoteSummary?.summary?.objective?.length ? (
                    clinicalNoteSummary.summary?.objective.map(
                      (item: any, index: number) => <li key={index}>{item}</li>
                    )
                  ) : (
                    <li>N/A</li>
                  )}
                </ul>
              </div>

              <div className={styles.section}>
                <strong>Assessment:</strong>
                <p>{clinicalNoteSummary?.summary?.assessment || "N/A"}</p>
              </div>

              <div className={styles.section}>
                <strong>Plan:</strong>
                <ul>
                  {clinicalNoteSummary?.summary?.plan?.length ? (
                    clinicalNoteSummary?.summary?.plan.map(
                      (item: any, index: number) => <li key={index}>{item}</li>
                    )
                  ) : (
                    <li>N/A</li>
                  )}
                </ul>
              </div>
              <hr />
              <div className={styles.section}>
                <strong>Explanation of Terms:</strong>
                <ul>
                  {clinicalNoteSummary?.explanations?.length ? (
                    clinicalNoteSummary?.explanations.map(
                      (item: any, index: number) => (
                        <dl key={index}>
                          <dt>
                            <strong>{item?.term}</strong>
                          </dt>
                          <dd>{item?.explanation}</dd>
                        </dl>
                      )
                    )
                  ) : (
                    <li>N/A</li>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <div className={styles.placeholder}>
              <p>
                Please click the <strong>Get Summary</strong> button to generate
                a summary report.
              </p>
            </div>
          )}
        </div>
      </div>
      <GetSummaryModal onApplyBtn={handleApply} />
    </div>
  ) : (
    <NoDataPage />
  );
};

export default SummaryPage;
