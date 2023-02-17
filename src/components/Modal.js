import React, { useEffect, useRef } from "react";
import { IconContext } from "react-icons";
import { BiX } from "react-icons/bi";

export const Modal = ({ children, isOpen, onClose }) => {
  const modal = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modal.current.showModal();
    } else {
      modal.current.close();
    }
  }, [isOpen]);

  // put children in div instead of directly in dialog because otherwise
  // the padding is messed up (when applied to the dialog)
  return (
    <dialog ref={modal} className="Modal" onClose={onClose}>
      <div className="Modal-content">{children}</div>
      <button className="Modal-close icon-button" onClick={onClose}>
        <IconContext.Provider value={{ className: "icon" }}>
          <BiX />
        </IconContext.Provider>
      </button>
    </dialog>
  );
};
