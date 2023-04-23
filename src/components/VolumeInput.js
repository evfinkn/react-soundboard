import React from "react";

export default ({
  volume,
  onUpdateVolume,
  min = 0,
  max = 100,
  step = 1,
} = {}) => {
  return (
    <div>
      <label>
        {"Volume: "}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={volume}
          className="volume-slider"
          onChange={(e) => onUpdateVolume(e.target.value)}
        />
        <input
          type="number"
          required
          min={min}
          max={max}
          value={volume}
          className="volume-input"
          onChange={(e) => onUpdateVolume(e.target.value)}
        />
      </label>
    </div>
  );
};
