import { useState, useEffect } from "react";
import styles from "@/styles/Modal.module.css";
import { FaTimes } from "react-icons/fa";
import ReactDOM from "react-dom";

export default function Modal({ show, children, title, onClose }) {
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true)
    const user1={
      fullName: "null name",
      logInfo: function(){
        console.log(this.fullName)
      }
    }
    const user2={
      fullName: "null name 2",
      logInfo: function(){
        console.log(this.fullName)
      }
    }

    user1.logInfo()
    user2.logInfo()

  });

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <h3>{title}</h3>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
  } else {
    return null;
  }
}
