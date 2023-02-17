import React, { useRef } from "react";
import { HexColorInput } from "react-colorful";
import { DebouncePicker } from "./DebouncePicker";
import { Modal } from "./Modal";

export const SoundSettingsModal = ({
  isOpen,
  onClose,
  onUpdateName,
  color,
  onUpdateColor,
}) => {
  const nameInput = useRef(null);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <label>
        {"Enter a name: "}
        <input type="text" placeholder="name" ref={nameInput} />
      </label>
      <button
        value="confirm"
        onClick={() => onUpdateName(nameInput.current.value)}
      >
        Confirm
      </button>
      <br />
      <br />
      <DebouncePicker color={color} onChange={onUpdateColor} />
      <HexColorInput color={color} onChange={onUpdateColor} />
    </Modal>
  );
};
