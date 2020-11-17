import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content outline={course.outline} />
      <Total outline={course.outline} />
    </div>
  );
};

export default Course;
