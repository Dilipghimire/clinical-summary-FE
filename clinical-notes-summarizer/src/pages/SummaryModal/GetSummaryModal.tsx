import { Modal } from "../../components/modal/Modal";
import { useModal } from "../../context/ModelContext";

const GetSummaryModal = ({ onApplyBtn }: { onApplyBtn: any }) => {
  const { isOpen } = useModal();

  if (!isOpen) return null;

  return (
    isOpen && (
      <Modal
        title="Report summary"
        body={
          <div>
            <p>
              This action <strong>cannot be undone</strong>. All uploaded
              documents and entered patient information will be{" "}
              <strong>permanently deleted</strong> after the summary is
              generated.
            </p>
            <p style={{ marginTop: "1rem" }}>
              You have the option to <strong>Print</strong> or{" "}
              <strong>Email</strong> the summary report.
            </p>
          </div>
        }
        onApplyBtn={onApplyBtn}
      />
    )
  );
};

export default GetSummaryModal;
