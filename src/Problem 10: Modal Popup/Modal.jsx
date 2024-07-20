import { useEffect } from "react";
import "./styles.css";

export const Modal = ({
  title = "Modal Header",
  content,
  cancelBtnLabel = "Cancel",
  confirmBtnLabel = "Confirm",
  onClose,
  onConfirm,
}) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget || e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleOverlayClick);
    };
  }, []);

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal-content">
        <header>
          <h3>{title}</h3> <button onClick={onClose}>❌</button>
        </header>
        <main>{content}</main>
        <footer>
          <button onClick={onClose}>{cancelBtnLabel}</button>
          <button onClick={onConfirm}>{confirmBtnLabel}</button>
        </footer>
      </div>
    </div>
  );
};
