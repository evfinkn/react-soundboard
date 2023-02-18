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
  volume,
  onUpdateVolume,
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
      <br />
      <br />
      <label>
        {"Volume: "}
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          className="volume-slider"
          onChange={(e) => onUpdateVolume(e.target.value)}
        />
        <input
          type="number"
          min={0}
          max={100}
          value={volume}
          required
          className="volume-input"
          onChange={(e) => onUpdateVolume(e.target.value)}
        />
      </label>
    </Modal>
  );
};
