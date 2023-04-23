import React from "react";

export default ({
  playbackRate,
  onUpdatePlaybackRate,
  min = 0.1,
  max = 10,
  step = 0.1,
} = {}) => {
  return (
    <div>
      <label>
        {"Playback rate: "}
        <input
          type="number"
          required
          min={min}
          max={max}
          step={step}
          value={playbackRate}
          className="playbackrate-input"
          onChange={(e) => onUpdatePlaybackRate(e.target.value)}
        />
      </label>
    </div>
  );
};
