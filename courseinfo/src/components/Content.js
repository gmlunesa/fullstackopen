import React from "react";
import Part from "./Part";

const Content = ({ outline }) => {
  return (
    <>
      {outline.map((prop) => (
        <Part key={prop.id} part={prop.part} exercises={prop.exercises} />
      ))}
    </>
  );
};

export default Content;
