import React from "react";
import { Collapsible } from "./Collapsible";
import { Sound } from "./Sound";

export const SoundCategory = ({ name, children, depth = 0 }) => {
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
