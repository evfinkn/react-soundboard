import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDebounce } from "react-use";

// https://codesandbox.io/s/dgqn0?file=/src/DebouncedPicker.js
export const DebouncePicker = ({ color, onChange }) => {
  const [value, setValue] = useState(color);
  useDebounce(() => onChange(value), 100, [value]);
  return <HexColorPicker color={value} onChange={setValue} />;
};
