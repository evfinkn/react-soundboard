import React, { useState } from "react";
import { IconContext } from "react-icons";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";

export const Collapsible = ({ heading, depth, children }) => {
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
