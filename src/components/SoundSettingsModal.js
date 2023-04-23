import React from "react";
import { DebouncePicker } from "./DebouncePicker";
import { Modal } from "./Modal";
import { NameInput } from "./NameInput";
import { PlaybackRateInput } from "./PlaybackRateInput";
import { VolumeInput } from "./VolumeInput";

export const SoundSettingsModal = ({
  isOpen,
  onClose,
  onUpdateName,
  color,
  onUpdateColor,
  volume,
  onUpdateVolume,
  playbackRate,
  onUpdatePlaybackRate,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <NameInput onUpdateName={onUpdateName} />
      <DebouncePicker color={color} onChange={onUpdateColor} />
      <VolumeInput volume={volume} onUpdateVolume={onUpdateVolume} />
      <PlaybackRateInput
        playbackRate={playbackRate}
        onUpdatePlaybackRate={onUpdatePlaybackRate}
      />
    </Modal>
  );
};
