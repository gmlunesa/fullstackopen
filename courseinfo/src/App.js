import ReactDOM from "react-dom";

const App = () => {
  const course = {
    name: "Half Stack application development",
    outline: [
      {
        part: "Fundamentals of React",
        exercise: 10,
      },
      {
        part: "Using props to pass data",
        exercise: 7,
      },
      {
        part: "State of a component",
        exercise: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content outline={course.outline} />
      <Total outline={course.outline} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      {props.outline.map((prop) => (
        <Part part={prop.part} exercise={prop.exercise} />
      ))}
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} : {props.exercise}
    </p>
  );
};

const Total = (props) => {
  let sum = 0;
  console.log(props.outline);

  props.outline.forEach((element) => {
    sum += element.exercise;
  });
  return <p>Number of exercises = {sum}</p>;
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
