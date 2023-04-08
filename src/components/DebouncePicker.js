import React, { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useDebounce } from "react-use";

// https://codesandbox.io/s/dgqn0?file=/src/DebouncedPicker.js
export const DebouncePicker = ({ color, onChange }) => {
  const [value, setValue] = useState(color);
  useDebounce(() => onChange(value), 10, [value]);
  return (
    <div>
      <HexColorPicker color={value} onChange={setValue} />
      <HexColorInput color={value} onChange={setValue} />
    </div>
  );
};
