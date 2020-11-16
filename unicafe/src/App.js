import React, { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = (props) => {
  let { good, neutral, bad, all, average, positive } = props;
  if (all === 0) {
    return <p>No feedback given.</p>;
  }
  return (
    <table>
      <tbody>
        <Statistic text="Good" value={good} />
        <Statistic text="Neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />
        <Statistic text="All" value={all} />
        <Statistic text="Average" value={average} />
        <Statistic text="Positive" value={positive} />
      </tbody>
    </table>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value}
        {text === "Positive" ? "%" : ""}
      </td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodButtonClick = () => {
    setGood(good + 1);
    setAll(all + 1);
    setAverage(((good + 1) * 1 + neutral * 0 + bad * -1) / (all + 1));
    setPositive(((good + 1) / (all + 1)) * 100);
  };

  const handleBadButtonClick = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setAverage((good * 1 + neutral * 0 + (bad + 1) * -1) / (all + 1));
    setPositive((good / (all + 1)) * 100);
  };

  const handleNeutralButtonClick = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    setAverage((good * 1 + (neutral + 1) * 0 + bad * -1) / (all + 1));
    setPositive((good / (all + 1)) * 100);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGoodButtonClick} text="Good" />
      <Button onClick={handleNeutralButtonClick} text="Neutral" />
      <Button onClick={handleBadButtonClick} text="Bad" />
      <h2>Statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
