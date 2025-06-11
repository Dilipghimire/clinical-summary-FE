import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import SigninForm from "../pages/SigninForm";
import { PatientInfoForm } from "../pages/PatientInfo";
import { PatientInfoProvider } from "../context/PatientInfoContext";
import UploadFiles from "../pages/UploadFiles";
import { Footer } from "../pages/Footer";
import SummaryPage from "../pages/SummaryPage";
import { ModalProvider } from "../context/ModelContext";
import ProtectedRoute from "./protectedroutes";
import Header from "../pages/Header";

const AppRouter: React.FC = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Router>
        <PatientInfoProvider>
          <ModalProvider>
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/login" element={<SigninForm />} />
                {/* Protected routes go here */}
                <Route element={<ProtectedRoute />}>
                  <Route
                    element={
                      <>
                        <Header />
                        <main style={{ padding: "1rem" }}>
                          <Outlet />
                        </main>
                      </>
                    }
                  >
                    <Route path="/patient-info" element={<PatientInfoForm />} />
                    <Route path="/upload-files" element={<UploadFiles />} />
                    <Route path="/summarize-report" element={<SummaryPage />} />
                    <Route
                      path="*"
                      element={<Navigate to="/login" replace />}
                    />
                  </Route>
                </Route>
              </Routes>
            </div>
          </ModalProvider>
          <Footer />
        </PatientInfoProvider>
      </Router>
    </div>
  );
};

export default AppRouter;
