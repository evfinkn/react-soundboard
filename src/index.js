import React from "react";
import ReactDOM from "react-dom/client";
import { Soundboard } from "./components/Soundboard";
import "./index.css";

const urlStrings = [];
// passing window.location.href to the URL constructor makes it so that
// if urlString is a relative path, it is prepended with the current url.
// e.g. "audio/sound1.mp3" => "http://localhost:3000/audio/sound1.mp3"
const urls = urlStrings.map(
  (urlString) => new URL(urlString, window.location.href)
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Soundboard urls={urls} />);
