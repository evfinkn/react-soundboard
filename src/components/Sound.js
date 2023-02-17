import React, { useState } from "react";
import { IconContext } from "react-icons";
import { BiDotsVerticalRounded, BiPause, BiPlay } from "react-icons/bi";
import { SoundSettingsModal } from "./SoundSettingsModal";
import { pickForegroundColor } from "../util";

export const Sound = ({ sound }) => {
  // .split("/").at(-1) gets the audio file name
  // decodeURI to show the expected file name i.e. including spaces
  const [name, setName] = useState(
    decodeURI(sound.url.pathname.split("/").at(-1))
  );
  // #E9967A is darksalmon
  const [backgroundColor, setBackgroundColor] = useState("#E9967A");
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const dialog = (
    <SoundSettingsModal
      isOpen={dialogIsOpen}
      onClose={() => setDialogIsOpen(false)}
      onUpdateName={(name) => {
        setName(name);
        setDialogIsOpen(false);
      }}
      color={backgroundColor}
      onUpdateColor={(color) => {
        setBackgroundColor(color);
        setForegroundColor(pickForegroundColor(color, "#000000", "#ffffff"));
      }}
    ></SoundSettingsModal>
  );
  return (
    <div className="Sound-div" style={{ color: foregroundColor }}>
      <button
        className="Sound"
        title={name}
        onClick={sound.toggle}
        style={{ backgroundColor: backgroundColor }}
      >
        <IconContext.Provider value={{ className: "icon" }}>
          {sound.playing ? <BiPause /> : <BiPlay />} {name}
        </IconContext.Provider>
      </button>
      <button
        className="Sound-settings icon-button"
        onClick={() => setDialogIsOpen(true)}
      >
        <IconContext.Provider value={{ className: "icon" }}>
          <BiDotsVerticalRounded />
        </IconContext.Provider>
      </button>
      {dialog}
    </div>
  );
};
