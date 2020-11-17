import React from "react";

const Total = ({ outline }) => {
  // let sum = 0;
  // //console.log(outline);

  // outline.forEach((element) => {
  //   sum += element.exercise;
  // });

  const reducer = (accumulator, currentSum) => {
    return accumulator + currentSum.exercises;
  };

  const sum = outline.reduce(reducer, 0);

  return (
    <p>
      <strong>Total of {sum} exercises.</strong>
    </p>
  );
};

export default Total;
