import React from "react";
import { SoundCategory } from "./SoundCategory";
import { useSounds } from "../hooks/useSounds";

export const Soundboard = ({ urls }) => {
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
