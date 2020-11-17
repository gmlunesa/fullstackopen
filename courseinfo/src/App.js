import React from "react";
import ReactDOM from "react-dom";

import Course from "./components/Course";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      outline: [
        {
          part: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          part: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          part: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          part: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      outline: [
        {
          part: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          part: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return courses.map((course) => <Course key={course.id} course={course} />);
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
