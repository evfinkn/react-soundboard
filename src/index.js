import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { IconContext } from "react-icons";
import {
  BiChevronRight,
  BiChevronDown,
  BiDotsVerticalRounded,
  BiPause,
  BiPlay,
  BiX,
} from "react-icons/bi";
import "./index.css";

const useSounds = (urls) => {
  const objs = {};
  urls.forEach(
    (url) =>
      (objs[url] = {
        playing: false,
        audio: new Audio(url),
        url: url,
      })
  );
  const [sounds, setSounds] = useState(objs);

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

  const handleEnded = (event) => sounds[event.target.src].toggle();

  // run on mount and unmount
  // handles updating the audio's "playing" property after the audio has ended
  useEffect(() => {
    Object.values(sounds).forEach((sound) => {
      // when an audio clip ends, it needs to update "playing"
      sound.audio.addEventListener("ended", handleEnded);
    });
    // returning a function makes that function get called on unmount
    return () => {
      // cleans up by removing event listeners so that
      // the audio elements can be garbage collected
      Object.values(sounds).forEach((sound) => {
        sound.audio.removeEventListener("ended", handleEnded);
      });
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // [] makes this run only on mount and unmount (and not on update)

  return sounds;
};

const Collapsible = ({ heading, depth, children }) => {
  const [hidden, setHidden] = useState(false);

  const span = (
    <span>
      <IconContext.Provider value={{ className: "icon" }}>
        {hidden ? <BiChevronRight /> : <BiChevronDown />}
      </IconContext.Provider>
    </span>
  );
  const content = (
    <div className="Collapsible-content" hidden={hidden}>
      {children}
    </div>
  );
  // the fontSize makes it so deeper nested headings are smaller
  const h2 = (
    <h2
      style={{ fontSize: Math.max(32 - depth * 3, 20) }}
      className="Collapsible-heading"
    >
      {span}
      {heading}
    </h2>
  );
  const button = (
    <button className="icon-button" onClick={() => setHidden(!hidden)}>
      {h2}
    </button>
  );
  return (
    <div>
      {button}
      {content}
    </div>
  );
};

const Modal = ({ children, isOpen, onClose }) => {
  const modal = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modal.current.showModal();
    } else {
      modal.current.close();
    }
  }, [isOpen]);

  // put children in div instead of directly in dialog because otherwise
  // the padding is messed up (when applied to the dialog)
  return (
    <dialog ref={modal} className="Modal" onClose={onClose}>
      <div className="Modal-content">{children}</div>
      <button className="Modal-close icon-button" onClick={onClose}>
        <IconContext.Provider value={{ className: "icon" }}>
          <BiX />
        </IconContext.Provider>
      </button>
    </dialog>
  );
};

const SoundSettingsModal = ({ isOpen, onClose, onUpdateName }) => {
  const nameInput = useRef(null);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <label>
        {"Enter a name: "}
        <input type="text" placeholder="name" ref={nameInput}></input>
      </label>
      <button
        value="confirm"
        onClick={() => onUpdateName(nameInput.current.value)}
      >
        Confirm
      </button>
    </Modal>
  );
};

const Sound = ({ sound }) => {
  // .split("/").at(-1) gets the audio file name
  // decodeURI to show the expected file name i.e. including spaces
  const [name, setName] = useState(
    decodeURI(sound.url.pathname.split("/").at(-1))
  );
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const dialog = (
    <SoundSettingsModal
      isOpen={dialogIsOpen}
      onClose={() => setDialogIsOpen(false)}
      onUpdateName={(name) => {
        setName(name);
        setDialogIsOpen(false);
      }}
    ></SoundSettingsModal>
  );
  return (
    <div className="Sound-div">
      <button className="Sound" title={name} onClick={sound.toggle}>
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

const SoundCategory = ({ name, children, depth = 0 }) => {
  // every url path (category path) ends with the empty string to indicate that
  // the children are sounds. That way, we don't need to check each child for
  // if it's a category or sound
  if (name === "") {
    return (
      <div>
        {children.map((sound) => (
          <Sound key={sound.url} sound={sound} />
        ))}
      </div>
    );
  }
  return (
    <Collapsible heading={name} depth={depth}>
      {Object.entries(children).map(([subname, subchildren]) => (
        <SoundCategory
          key={subname}
          name={subname}
          children={subchildren}
          depth={depth + 1}
        />
      ))}
    </Collapsible>
  );
};

const Soundboard = ({ urls }) => {
  const sounds = useSounds(urls);

  const categories = {};
  // separates each directory in the path into it's own category
  // for example, if we have audio/sound1.mp3, audio/dir1/sound2.mp3,
  // audio/dir1/dir11/sound3.mp3, audio/dir1/dir12/sound4.mp3,
  // audio/dir2/sound5.mp3, and audio/dir2/sound6.mp3, you get the hierarchy
  //
  // sound1.mp3
  // dir1
  //   |___ sound2.mp3
  //   |___ dir11
  //   |      |___ sound3.mp3
  //   |___ dir12
  //   |      |___ sound4.mp3
  // dir2
  //   |___ sound5.mp3
  //   |___ sound6.mp3
  //
  // any sounds are actually in a category with the name "" that's
  // under the final category. In other words, the categories for
  // audio/dir1/dir11/sound3.mp3 are
  // category "dir1" parent of (
  //   category "dir11" parent of (
  //     category "" parent of sound "sound3.mp3"))
  // Instead of sound3.mp3 belonging to "dir11", it belongs to "" which belongs
  // to "dir11". This is to make handling sounds vs categories easier since it
  // means the children of a category are either all categories (if the name != "")
  // or all sounds (if the name == ""). It's also nice because "" is sorted first,
  // so we don't need to filter for the sounds to put them before the categories
  urls.sort().forEach((url) => {
    // .pathname.substring(1) to remove the leading host part of the url
    // e.g. "http://localhost:3000/audio/sound1.mp3" => "audio/sound.mp3"
    const path = url.pathname.substring(1).split("/");
    let currentSubObj = categories;
    for (let i = 0; i < path.length - 1; i++) {
      if (currentSubObj[path[i]] === undefined) {
        currentSubObj[path[i]] = {};
      }
      currentSubObj = currentSubObj[path[i]];
    }
    if (currentSubObj[""] === undefined) {
      currentSubObj[""] = [];
    }
    currentSubObj[""].push(sounds[url]);
  });
  return Object.entries(categories).map(([name, children]) => {
    return <SoundCategory key={name} name={name} children={children} />;
  });
};

const urlStrings = [];
// passing window.location.href to the URL constructor makes it so that
// if urlString is a relative path, it is prepended with the current url.
// e.g. "audio/sound1.mp3" => "http://localhost:3000/audio/sound1.mp3"
const urls = urlStrings.map(
  (urlString) => new URL(urlString, window.location.href)
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Soundboard urls={urls} />);
