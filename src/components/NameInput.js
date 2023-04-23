import React, { useRef } from "react";

export default ({ onUpdateName }) => {
  const nameInput = useRef(null);
  return (
    <div>
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
    </div>
  );
};
