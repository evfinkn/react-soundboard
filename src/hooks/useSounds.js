import { useState, useEffect } from "react";

export default (urls) => {
  const [sounds, setSounds] = useState(() => {
    const sounds = {};
    urls.forEach(
      (url) =>
        (sounds[url] = {
          playing: false,
          audio: new Audio(url),
          url: url,
        })
    );
    return sounds;
  });

  // toggle(url) returns a function that will toggle that url
  const toggle = (url) => () => {
    const newSounds = { ...sounds };
    const currentlyPlaying = Object.values(sounds).find(
      (sound) => sound.playing
    );
    if (currentlyPlaying !== undefined) {
      currentlyPlaying.playing = false;
      currentlyPlaying.audio.currentTime = 0;
      if (currentlyPlaying.url !== url) {
        newSounds[url].playing = true;
      }
    } else {
      newSounds[url].playing = true;
    }
    setSounds(newSounds);
  };

  Object.values(sounds).forEach((sound) => (sound.toggle = toggle(sound.url)));

  // run on mount, unmount, and update
  // handles playing and pausing the sounds
  useEffect(() => {
    Object.values(sounds).forEach((sound) => {
      if (sound.playing) {
        sound.audio.play();
      } else {
        sound.audio.pause();
      }
    });
  });

  // handles updating the audio's "playing" property after the audio has ended
  const handleEnded = (event) => sounds[event.target.src].toggle();
  Object.values(sounds).forEach((sound) => {
    // when an audio clip ends, it needs to update "playing"
    sound.audio.addEventListener("ended", handleEnded);
  });

  return sounds;
};
